# 遗留节点图系统架构参考文档

<div align="center">

## 《遗留节点图系统架构参考文档 (Legacy Node Graph System Architecture Reference)》

</div>

## 1. 绪论 (Introduction)

### 1.1 系统综述

* **定义**：描述该系统是一套基于 **C/S 架构** 的可视化逻辑脚本系统。
* **核心设计哲学**：
* **表现与逻辑分离**：编辑器/客户端（Shell）与服务端（Kernel）解耦。
* **强类型契约**：基于 Protobuf 的严格序列化，但在传输层采用泛型容器（VarBase）封装。
* **资源打包**：以 `.gia` (AssetBundle) 为单位的依赖管理。



### 1.2 关键术语表 (Terminology)

* **Shell (外壳)**：节点的 UI 定义，决定引脚布局。
* **Kernel (内核)**：节点的底层实现 ID，决定执行逻辑。
* **Composite (复合)**：指代子图引用或系统生成的接口包装器。
* **Stub (存根)**：指代自动生成的代理节点（如 RPC 发送端）。

---

## 2. 资源与资产系统 (Resource & Asset System)

### 2.1 资产包结构 (`.gia` / AssetBundle)

* **主资源与依赖池**：解释 `Asset` (主入口) 与 `Accessories` (依赖项) 的关系。
* **Wrapper 机制**：解释为何存在 `NodeGraphWrapper` 和 `CompositeDefWrapper`（版本兼容与类型擦除）。

### 2.2 全局标识符系统 (`GlobalIdentifier`)

* **三维定位坐标系**：
1. **Origin (域)**：用户定义 (10000) vs 系统内置 (10001)。
2. **Category (分类)**：后端逻辑 (20000) vs 前端表现 (20001) vs 过滤器 (1)。
3. **Kind (原型)**：物理数据结构类型（图、结构体、存根）。


* **ID 的作用域**：辨析 `GUID` (世界实体) 与 `ID` (逻辑定义) 的区别。

---

## 3. 节点模型架构 (Node Architecture)

### 3.1 外壳-内核分离模式 (The Shell-Kernel Model)

* **双重 ID 机制**：解释 `shell_ref` 与 `kernel_ref` 的映射关系。
* **生命周期状态**：
* **Dirty/Unresolved**：`kernel_ref` 为空，代表泛型节点未选定类型。
* **Resolved**：`kernel_ref` 指向具体实现函数（如 `Math_Add_Int`）。



### 3.2 复合与多态节点 (`CompositeDef`)

* **接口契约**：解释 `CompositeDef` 如何作为“函数签名”存在。
* **逻辑模板矩阵**：
* 详解 `TemplateRoot` (Which) 与 `TemplateSub` (SubWhich) 的组合含义。
* 分类：用户子图、信号存根、结构体拆装。


* **穿透映射**：解释 `persistent_pin_uid` 如何在接口定义变更时维持连线稳定性。

### 3.3 客户端代理机制 (Client Proxy)

* **Kernel 2000 (RPC 网关)**：解释客户端如何通过单一内核处理所有服务器调用。
* **Type 5 引脚 (元数据通道)**：
* **OpCode 载体**：Pin 0 如何携带服务端 ShellID。
* **动态路由**：SendSignal 节点如何利用 Hash 路由。



---

## 4. 图逻辑与执行流 (Graph Execution Logic)

### 4.1 图容器 (`NodeGraph`)

* **执行层**：`nodes` 列表的实例化逻辑。
* **接口层**：`port_mappings` 如何将外部信号“穿墙”导向内部节点。
* **黑板系统**：`blackboard` (`GraphVariable`) 的作用域与暴露机制。

### 4.2 信号与事件系统

* **发布/订阅模型**：客户端 `SendSignal` 与服务端 `ListenSignal` 的对应关系。
* **上下文注入**：入口节点 (`kernel_ref` 2001) 的 `context_declaration` 作用。

---

## 5. 类型与数值系统 (Type & Value System)

### 5.1 双重类型映射 (Dual Type System)

* **映射表**：列出 `ServerTypeId` (C++) 与 `ClientTypeId` (C#/Lua) 的对应关系。
* **设计成因**：解释历史遗留与架构隔离导致的两套编号体系。

### 5.2 递归数值容器 (`TypedValue` / `VarBase`)

* **存储结构**：`storage` (OneOf) 的多态存储。
* **UI 渲染提示**：`WidgetType` 如何指导编辑器绘制（如颜色选择器、枚举下拉）。
* **空值处理**：`is_explicitly_set` (Mask) 的逻辑意义。

### 5.3 泛型实例化元数据 (`DynamicTypeMetadata`)

* **问题定义**：解决空容器（Empty List/Map）类型丢失的问题。
* **扁平化描述**：解释 `wrapper` 字段如何提供结构体 ID 或 Map 键值对类型的静态模版。

---

## 6. 附录：数据迁移指南 (Migration Guide)

### 6.1 遗留字段映射表

* **Magic Numbers**：
* `Class: 10001` -> System Defined
* `Kernel: 2000` -> RPC Gateway
* `Pin Type: 5` -> Meta/OpCode


* **Legacy Flags**：`xxxx_always_1` 的位掩码含义处理。

### 6.2 常见模式转换

* 如何将 `CompositePin` 转换为新系统的子图引用。
* 如何将 `Type 5` 引脚数据提取为新系统的 RPC 配置。
