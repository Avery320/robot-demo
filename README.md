# 🤖 RoboSim0 - 3D 視覺化與控制介面

本專案是針對機械手臂開發的模擬平台，目標是希望打造一個通用的機械手臂的模擬、控制、調適工具。

系統使用 Javascript 開發，整合 **ROS(Robot Operating System)** 作為逆向運動學、相機辨識等的運算核心，使用 ROS Bridge 連線，支援前後端的數據相互傳輸，基本默認功能包括：「Joint, Pose 數值的發送，控制六軸機械手臂運動；roslog 的 feedback 資料查看；ROS Topic 的訂閱」。

🔗 **線上展示網址：** [https://avery320.github.io/robot-demo/](https://avery320.github.io/robot-demo/)

---

## 🚀 核心功能介紹

### 1. Robot 機器人模型
本專案以標準的 URDF 模型作為機械手臂來源，並依照 [**ROS REP-103**](https://www.ros.org/reps/rep-0103.html)、[**ROS REP-199**](https://gavanderhoorn.github.io/rep/rep-0199.html) 標準進行開發，內容包括：「機械手臂選擇、自訂客製化機械手臂、機械手臂與末端執行器組裝、URDF 模型輸出、Link Frame 查看、TCP 選擇」功能。

#### 1.1 機械手臂模型
機器人包括專案默認的機械手臂（Robot），本專案維護的機器人倉庫（[Robot Library](https://github.com/Avery320/robosim_library)）可供開發者選擇。

專案同時也提供上傳 **客製化機械手臂** 功能，點選 **Uploader Robot Folder** 按鈕，使用者可以上傳自己的機器人模型進行操作。

#### 1.2 機械手臂末端執行器組裝
機械手臂 URDF 採用 [**ROS REP-103**](https://www.ros.org/reps/rep-0103.html)、[**ROS REP-199**](https://gavanderhoorn.github.io/rep/rep-0199.html) 標準進行開發，並提供機械手臂末端執行器（End Effector）組裝。

專案同時也提供上傳 **客製化末端執行器** 功能，點選 **Upload End Effector Folder** 即可上傳自己的魔端執行器與機械手臂組裝。

#### 1.3 URDF 模型輸出

#### 1.4 Link Frame 開發者工具

#### 1.5 TCP 選擇
專案會自動偵測 joint6 底下的 Link ，包括：「tool0、flange」兩個標準的 Link ，以及末端執行器上的 Link 設置。

### View 畫面操作
本專案的整體操作偏向 3D 建模軟體的操作習慣，目前使用透視圖作為視圖標準，包括：「前、後、左、右、上、下與透視圖，以及東南、西南、西北、東北四個方向視角」等基本的視角操作。

以及提供「螢幕鎖定」、「相機旋轉」、「螢幕截圖」三個而外的功能操作。

<!-- 作業視窗的 World 平面軸與網格的顯示、關閉功能。 -->

### Geometry 幾何功能
開發中......

### Tools 功能模組

#### 

####



