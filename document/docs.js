const MANIFEST_URL = './manifest.json';
const DEFAULT_LANGUAGE = 'zh-TW';
const LANGUAGE_TEXT = {
  'zh-TW': {
    loading: '正在載入文件…',
    search: '搜尋文件、Group、Node',
    loadError: '無法讀取',
  },
  en: {
    loading: 'Loading documentation…',
    search: 'Search documents, groups, and nodes',
    loadError: 'Unable to load',
  },
};
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const language = Object.hasOwn(LANGUAGE_TEXT, requestedLanguage)
  ? requestedLanguage
  : DEFAULT_LANGUAGE;
const text = LANGUAGE_TEXT[language];

const siteTitle = document.querySelector('.site-title');
const languageSelect = document.querySelector('#language-select');
const navigation = document.querySelector('#document-navigation');
const navigationSearch = document.querySelector('#navigation-search');
const content = document.querySelector('#document-content');

let homeDocument;
let documents;

function websiteUrl(path, hash = '') {
  const url = new URL(window.location.href);
  url.search = '';
  if (language !== DEFAULT_LANGUAGE) url.searchParams.set('lang', language);
  if (path !== homeDocument) url.searchParams.set('page', path);
  url.hash = hash;
  return url;
}

async function readJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${text.loadError}: ${url} (${response.status})`);
  return response.json();
}

async function loadDocument(path) {
  const documentData = documents.get(path);
  const response = await fetch(new URL(documentData.content, window.location.href));
  if (!response.ok) {
    throw new Error(`${text.loadError}: ${documentData.content} (${response.status})`);
  }
  documentData.html = await response.text();
}

function createTreeItem(label, children = [], target = null, searchText = label) {
  const item = document.createElement(children.length ? 'details' : 'div');
  item.className = 'tree-item';
  item.dataset.search = searchText.toLocaleLowerCase();
  const labelElement = document.createElement(target ? 'a' : 'span');
  labelElement.textContent = label;
  if (target) {
    labelElement.href = websiteUrl(target.path, target.hash);
    labelElement.dataset.document = target.path;
    labelElement.dataset.heading = target.hash;
  }
  if (children.length) {
    const summary = document.createElement('summary');
    summary.append(labelElement);
    const list = document.createElement('div');
    list.className = 'tree-children';
    list.append(...children);
    item.append(summary, list);
  } else {
    item.classList.add('tree-leaf');
    item.append(labelElement);
  }
  return item;
}

function documentTree(path) {
  const documentData = documents.get(path);
  const groups = [];
  let group;

  documentData.headings.filter(({ level }) => level > 1).forEach((heading) => {
    if (heading.level === 2) {
      group = { heading, nodes: [] };
      groups.push(group);
    } else if (group) {
      group.nodes.push(createTreeItem(
        heading.text,
        [],
        { path, hash: heading.id },
      ));
    }
  });

  const children = groups.map(({ heading, nodes }) => createTreeItem(
    heading.text,
    nodes,
    { path, hash: heading.id },
  ));
  return createTreeItem(
    documentData.title,
    children,
    { path, hash: '' },
    `${documentData.title} ${path.split('/').pop()}`,
  );
}

function renderNavigation(sections) {
  const list = document.createElement('div');
  list.className = 'navigation-tree';
  const homeTitle = documents.get(homeDocument).title;
  list.append(createTreeItem(homeTitle, [], { path: homeDocument, hash: '' }, homeDocument));
  sections.forEach(({ name, id, documents: paths }) => {
    const children = paths.map(documentTree);
    const section = createTreeItem(name, children, { path: homeDocument, hash: id });
    section.open = true;
    list.append(section);
  });
  navigation.replaceChildren(list);
}

function directChildren(item) {
  const list = item.lastElementChild;
  return list ? [...list.children] : [];
}

function filterTree(item, query) {
  const children = directChildren(item);
  const match = item.dataset.search.includes(query)
    || children.map((child) => filterTree(child, query)).some(Boolean);
  item.hidden = !match;
  return !item.hidden;
}

function filterNavigation() {
  const query = navigationSearch.value.trim().toLocaleLowerCase();
  navigation.classList.toggle('searching', Boolean(query));
  navigation.querySelectorAll('.tree-item').forEach((item) => { item.hidden = false; });
  const roots = [...navigation.querySelector('.navigation-tree').children];
  if (query) roots.forEach((item) => filterTree(item, query));
}

function bindDocumentLinks() {
  content.querySelectorAll('a[data-document]').forEach((link) => {
    const path = link.dataset.document;
    if (!documents.has(path)) return;
    link.href = websiteUrl(path, link.dataset.heading);
  });
}

function setActiveNavigation(path, hash = '') {
  const links = [...navigation.querySelectorAll('a[data-document]')];
  links.forEach((link) => link.removeAttribute('aria-current'));
  const documentLink = links.find((link) => (
    link.dataset.document === path && !link.dataset.heading
  ));
  const headingLink = hash
    ? links.find((link) => link.dataset.document === path && link.dataset.heading === hash)
    : null;
  documentLink?.setAttribute('aria-current', 'page');
  headingLink?.setAttribute('aria-current', 'location');
  const activeLink = headingLink || documentLink;
  if (!activeLink) return;
  for (let item = activeLink.parentElement; item; item = item.parentElement) {
    if (item.matches('details.tree-item')) item.open = true;
  }
  activeLink.scrollIntoView({ block: 'nearest' });
}

function scrollToHeading() {
  if (window.location.hash) {
    document
      .getElementById(decodeURIComponent(window.location.hash.slice(1)))
      ?.scrollIntoView({ block: 'center' });
  } else {
    window.scrollTo({ top: 0 });
  }
}

function requestedDocument() {
  const path = new URLSearchParams(window.location.search).get('page') || homeDocument;
  return documents.has(path) ? path : homeDocument;
}

function renderDocument(path) {
  const documentData = documents.get(path);
  content.innerHTML = documentData.html;
  bindDocumentLinks();
  const hash = decodeURIComponent(window.location.hash.slice(1));
  setActiveNavigation(path, hash);
  document.title = `${documentData.title} · RoboSim Documentation`;
  requestAnimationFrame(scrollToHeading);
}

function navigate(path, hash = '') {
  window.history.pushState(null, '', websiteUrl(path, hash));
  renderDocument(path);
}

function showError(error) {
  const message = document.createElement('p');
  message.className = 'document-error';
  message.textContent = error instanceof Error ? error.message : String(error);
  content.replaceChildren(message);
}

async function initialize() {
  try {
    document.documentElement.lang = language;
    languageSelect.value = language;
    navigationSearch.placeholder = text.search;
    navigationSearch.setAttribute('aria-label', text.search);
    content.querySelector('.document-state').textContent = text.loading;
    const manifest = await readJson(MANIFEST_URL);
    const languageData = manifest.languages[language];
    if (!languageData) throw new Error(`${text.loadError}: ${language}`);
    homeDocument = languageData.home;
    documents = new Map(Object.entries(languageData.documents));
    siteTitle.href = websiteUrl(homeDocument);
    await Promise.all([...documents.keys()].map(loadDocument));
    renderNavigation(languageData.sections);
    renderDocument(requestedDocument());
  } catch (error) {
    showError(error);
  }
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-document]');
  if (link) {
    event.preventDefault();
    navigate(link.dataset.document, link.dataset.heading);
  }
});
navigationSearch.addEventListener('input', filterNavigation);
languageSelect.addEventListener('change', () => {
  const url = new URL('./index.html', window.location.href);
  if (languageSelect.value !== DEFAULT_LANGUAGE) {
    url.searchParams.set('lang', languageSelect.value);
  }
  window.location.assign(url);
});
window.addEventListener('popstate', () => renderDocument(requestedDocument()));
window.addEventListener('hashchange', () => {
  scrollToHeading();
  setActiveNavigation(
    requestedDocument(),
    decodeURIComponent(window.location.hash.slice(1)),
  );
});

initialize();
