# 🤖 RoboSim0 - 3D 視覺化與控制介面
🔗 **線上展示網址：** [https://avery320.github.io/robot-demo/](https://avery320.github.io/robot-demo/)

本專案是以 URDF 驅動的機械手臂開發與模擬模擬平台，目標是希望打造一個通用的機械手臂的模擬、控制、調適工具。

系統使用 Javascript 開發，目前開發內容：
- Olp Engene 用於前端模擬機械手臂執行路徑
- ROS 整合，包括 ROS Topic 的相互資料交換，作為 ROS 前端控制平台。
- 幾何載入，使用 Speckle 作為幾何資料結構，目前支援從 Speckle Server 中載入模型。
- GH Connector 在 rhino/grasshopper 調用 RoboSim API 相互控制（尚未釋出）。

---

## 🚀 核心功能介紹

### 1. Robot 機器人模型
本專案以標準的 URDF 模型作為機械手臂來源，並依照 [**ROS REP-103**](https://www.ros.org/reps/rep-0103.html)、[**ROS REP-199**](https://gavanderhoorn.github.io/rep/rep-0199.html) 標準進行開發，內容包括：「機械手臂選擇、自訂客製化機械手臂、機械手臂與末端執行器組裝、URDF 模型輸出、Link Frame 查看、TCP 選擇」功能。

##### 1.1 機械手臂模型
機器人包括專案默認的機械手臂（Robot），本專案維護的機器人倉庫（[Robot Library](https://github.com/Avery320/robosim_library)）可供開發者選擇。專案同時也提供上傳 **客製化機械手臂** 功能，點選 **Uploader Robot Folder** 按鈕，使用者可以上傳自己的機器人模型進行操作。

目前支援 olp IK Solver 完整逆向運動學有：「kuka_kr10_1100_2、kuka_kr16_r1610_2、kuka_kr6_r700_2、kuka_kr6_r900_2」。

##### 1.2 機械手臂末端執行器組裝
機械手臂 URDF 採用 [**ROS REP-103**](https://www.ros.org/reps/rep-0103.html)、[**ROS REP-199**](https://gavanderhoorn.github.io/rep/rep-0199.html) 標準進行開發，並提供機械手臂末端執行器（End Effector）組裝。專案同時也提供上傳 **客製化末端執行器** 功能，點選 **Upload End Effector Folder** 即可上傳自己的魔端執行器與機械手臂組裝。

##### 1.3 TCP 選擇
專案會自動偵測 joint6 底下的 Link ，包括：「tool0、flange」兩個標準的 Link ，以及末端執行器上的 Link 設置。

##### 1.4 URDF 模型輸出


### 2. 專案架構與操作邏輯
RoboSim 主要架構由 Viewport 操作視窗、Station Tree 資產管理、Inspector 資訊面板為核心。
- Viewport 用於所有幾何資料的顯示與操作。
- 所以機器人、幾何、Frame 資產都會由 Staion Tree 做統一管理，並於 Inspector 中顯示相關資訊。

##### 2.1 節點層級
 Station Tree 節點以 Station(root)/World/Robot(Frame Node)/link... 之機器人獨立節點，與Station(root)/World/Frame/Model/Group 幾何節點作為層級結構。每個節點只能容納與該節點平行及以下層級之節點。節點設計：
 - 以 Frame 作為核心用於（1）操作機器人 Base Link 並會同步更新 URDF 參數狀態，與（2）幾何物件位置與旋轉。
 - Model 用於管理專案。
 - Group 節點為任務節點，分為 Simulation、Collision、Program。
    - Simulation 僅為模擬查看。
    - Collision 會啟動前端碰撞顯示，ROS 連線可以將幾何發送至 PlanningScene Topic。
    - Porgram 為 olp 專用節點，包含 MoveJ、MoveL、MoveAbjs、DO、Wait 控制指令。

##### 2.2 節點與資訊
所有節點都會有對應資訊進行調整。


### Geometry 幾何功能
本專案使用 [Speckle](https://github.com/specklesystems) 作為專案的幾何資料，載入 Speckle 專案模型於 RoboSim 顯示。

### GHBridge

