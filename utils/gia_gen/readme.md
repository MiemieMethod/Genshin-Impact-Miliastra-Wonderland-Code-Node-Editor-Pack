# GIA Generator (gia_gen)

`gia_gen` 是一个用于快速生成和操作 GIA 节点图文件的工具库。它旨在通过简单的接口简化复杂的节点图结构的创建过程。

## 已实现功能 (Implemented Features)

目前主要提供了一系列 Helper 函数，用于通过少量参数快速创建节点图的各个组件。

### 基础组件生成 (Basic Helpers)

所有 Helper 函数均通过 `gia` 对象导出。

*   **创建图 (Graph Body)**
    *   `gia.basic_graph_body(body: GraphBody)`
    *   创建一个包含基本信息的节点图根对象 (`Root`)。
    *   自动生成文件名、时间戳和基础 ID 结构。

*   **创建节点 (Node Body)**
    *   `gia.basic_node_body(body: NodeBody)`
    *   创建一个图节点 (`GraphNode`)。
    *   支持指定 Generic ID 和 Concrete ID，以及坐标位置 (x, y)。

*   **创建引脚 (Pin Body)**
    *   `gia.basic_pin_body(body: PinBody)`
    *   创建一个节点引脚 (`NodePin`)。
    *   支持指定引脚类型 (Kind)、索引 (Index) 和变量类型 (VarType)。

*   **创建引脚值 (Pin Value)**
    *   `gia.basic_pin_value(body: PinValue)`
    *   创建一个引脚值 (`VarBase`)。
    *   用于设置引脚的具体数值。

*   **创建枚举值 (Enum Value)**
    *   `gia.basic_enum_value(body: EnumValue)`
    *   创建一个枚举类型的变量值。

### 工具函数 (Utils)

*   `gia.random_int(len, starting)`: 生成指定长度的随机整数(支持1-16位数字)，支持指定起始字符串。(用于生成合法 ID)

## 使用示例 (Usage)

```typescript
import { gia } from "./index.ts";

// 创建节点列表
const nodes = [];
nodes.push(gia.basic_node_body({
  generic_id: 123,
  concrete_id: 123,
  x: 0,
  y: 0,
}));

// 创建图
const graph = gia.basic_graph_body({
  uid: 201123456,
  graph_id: 1021234567,
  nodes: nodes,
});

console.log(graph);
```

更多示例请参考 `test.ts`。

## 待实现功能 (Planned Features)

以下功能正在开发计划中：

- [ ] **类管理节点图 (Class-based Graph Management)**
    - [ ] 包装上述 Helper，提供面向对象的 `GraphManager` 类。
    - [ ] 提供更高级的接口来管理图的生命周期。

- [ ] **修改现有节点图 (Modify Existing Graphs)**
    - [ ] 加载现有 GIA 文件并进行修改。
    - [ ] 支持增删改查节点和连接。

- [ ] **高级操作方法 (Advanced Methods)**
    - [ ] **连接节点**: 提供 `connect(nodeA, pinA, nodeB, pinB)` 方法，自动处理引脚连接逻辑。
    - [ ] **设置参数**: 提供便捷方法修改节点或引脚的特定参数，无需手动遍历深层结构。

- [ ] **结构体管理 (Structure Management)**
    - [ ] 创建、管理和使用自定义结构体 (Structs)。
    - [ ] 提供结构体定义的 Helper。
