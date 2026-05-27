CHANGELOG
=========

v0.2.0
---

重大更新
- 新增 OLP IK Solver
    - 支援前端逆向運動學解析，進行路徑規劃。
    - 初步開發 KUKA 機械手臂輸出 .src 執行腳本，但 **尚未於實體 KUAK 機械手臂進行驗證**，使用請務必小心。

- Robot
    - 支援 Robot Base Link 調整。
    - 支援 Robot 與 End Effector 組裝。

- 調整 Station Tree 節點層級
    - Station(root)/World/Robot(Frame Node)/link......
    - Station(root)/World/Frame/Model/Group 層級關係。
    - Frame 節點為專案資產操作節點，操作內容包括：
        - Robot Base Link
        - 幾何資產
    - Group 節點為任務節點，分為 Simulation、Collision、Program。
        - Simulation 僅為模擬查看。
        - Collision 會啟動前端碰撞顯示，ROS 連線可以將幾何發送至 PlanningScene Topic。
        - Porgram 為 olp 專用節點，包含 MoveJ、MoveL、MoveAbjs、DO、Wait 控制指令。

基本操作：
- 建立專案 .robosim 檔名。
- 建立專案單位系統。
- 建立 menu 系統，Web 請使用：
    - Cmd/Ctrl + R：機器人
    - Cmd/Ctrl + G：幾何
    - Cmd/Ctrl + B：啟動 server。
- 新增 ICON 按鈕，改使用 ICON 按鈕作為點選功能。
- 統一專案 Log 系統，管理與輸出資料，包括：「 ROS、Program、檔案、模型載入、server 連線資訊」。

尚未整合：
- ROS Topic Panel 
- Card Programming Panel



v0.1.0 第一個試用版
---
基本操作：
- ribbon 系統
    - 上排 ribbon 分為 Robot, View, Geometry, Tools 四大類別功能
    - 以 ICON 作為主要的按鈕與狀態，停留在 ICON 上會顯示 Tooltips

    - Robot
        - 機械手臂選擇、末端執行器選擇、TCP 選擇、URDF 組裝與輸出、ROS Bridge 連線等機械手臂操作。
        - 專案重新整理
        - Link Frame 開發者工具
        - Ghost 幽靈模式(ROS 連線用)
    - View
        - View 為視圖操作工具。
        - 上、下、左、右、前、後、透視等視圖
        - 畫面 gird, world axis 的顯示與關閉
        - 東南、西南、西北、東北四個方向視角
        - 螢幕鎖定、「相機旋轉、螢幕截圖三個額外功能
        - 機械手臂 TCP 移動、旋轉模式的選擇
    - Geometry
        - 開發測試中
        - point plane, box 三種測試資料
    - Tools
        - 用於管理專案的工具列表

- Dock 系統
    - 系統提供主畫面與左、右、下側的 Dock 面板
    - 可拖曳工具 ICON 讓工具面板在不同 Dock 中配置
    - 工具列表可在 ribbon 中的 Tools 選擇啟動與關閉

- 操作
    - 選擇機械手臂後會被載入於視窗中
    - 可選擇 TCP 與 Joint 操作
    - TCP 操作包括以 TCP 作為座標移動與旋轉、以世界座標移動三種方式，對應 "View" 中的按鈕，亦可使用 "T", "R", "B" "N" 間切換
    - Joint 操作直接以機械手臂模型作為熱區，操作時會對應 Joint Slider 數值與 x, y, z, roll, pitch, yaw 的數值更新

- 工具
    - ROS Visualliztion
    - Topic Panel
    - ROS Log 
    - Gesture Control
    - GH Bridge
    - Station Tree
    - Inspector
    - Geometry
    - Terminal


v0.0.0 
---
先前版本

