# GIA 生成器 (`gia_gen`)

本目录提供用于快速生成和操作 GIA 节点图文件的工具库。通过简单的 API 简化复杂节点图结构的创建过程。

---

## 文件说明

| 文件 | 说明 | 状态 |
| :--- | :--- | :--- |
| [`graph.ts`](./graph.ts) | 图结构建模与序列化（**推荐**） | 活跃 |
| [`basic.ts`](./basic.ts) | 基础组件生成函数 | 活跃 |
| [`extract.ts`](./extract.ts) | 节点信息提取 | 活跃 |
| [`nodes.ts`](./nodes.ts) | 节点类型定义 | 活跃 |
| [`utils.ts`](./utils.ts) | 工具函数和计数器 | 活跃 |
| [`auto_layout.ts`](./auto_layout.ts) | 自动布局算法 | 活跃 |

---

## 快速入门

```typescript
import { Graph, NODE_ID, encode_gia_file } from "../index";

// 创建图
const graph = new Graph("server");

// 添加节点
const trigger = graph.add_node(NODE_ID.When_Entity_Is_Created);
const log = graph.add_node(NODE_ID.Log_Message);

// 连接执行流
graph.flow(trigger, log);

// 设置参数
log.setVal(0, "Hello World!");

// 自动布局
graph.autoLayout();

// 保存
encode_gia_file("./output.gia", graph.encode());
```

---

## 核心类

### `Graph` — 节点图管理器

```typescript
class Graph {
  constructor(type: "server" | "client" | "composite" = "server");
  
  // 节点管理
  add_node(node_id: number): Node;
  get_nodes(): Node[];
  get_node(unique_id: number): Node | null;
  
  // 连接管理
  flow(from: Node, to: Node, from_index?: number, to_index?: number): void;
  connect(from: Node, to: Node, from_index: number, to_index: number): void;
  disconnect(connect: Connect): void;
  get_connects(): Connect[];
  get_flows(): Connect[];
  
  // 注释管理
  add_comment(content: string, x?: number, y?: number): Comment;
  get_graph_comments(): Comment[];
  
  // 图变量
  add_graph_var(name: string, type: NodeType, exposed?: boolean): GraphVar | null;
  get_graph_var(name: string): GraphVar | undefined;
  
  // 序列化
  encode(opt?: EncodeOptions): Root;
  static decode(root: Root): Graph;
  
  // 布局
  autoLayout(distance?: number, separation?: number): void;
}
```

### `Node` — 节点实例

```typescript
class Node {
  pins: Pin[];
  x: number;
  y: number;
  
  setPos(x: number, y: number): void;
  setConcrete(id: number): void;
  setVal(pin: number | Pin, val: AnyType): void;
  
  UniqueId(): number;
  GenericId(): number;
  ConcreteId(): number | undefined;
  
  encode(opt: EncodeOptions, connects?: Connect[], flows?: Connect[][]): GraphNode;
  static decode(node: GraphNode): Node;
}
```

### `Pin` — 引脚实例

```typescript
class Pin {
  value: AnyType | undefined;
  type: NodeType | null;
  reflective: boolean;
  
  setVal(val: AnyType): void;
  setType(type: NodeType): void;
  clear(): void;
  
  encode(opt: EncodeOptions, connects?: Connect[]): NodePin | null;
}
```

### `Connect` — 连接实例

```typescript
class Connect {
  from: Node;
  to: Node;
  from_index: number;
  to_index: number;
  
  encode(): NodeConnection;
  encode_flow(): NodeConnection;
}
```

### `Comment` — 注释实例

```typescript
class Comment {
  content: string;
  x: number;
  y: number;
  attached_node: Node | null;
  
  attachTo(node: Node | null): void;
  encode(): Comments;
  static decode(c: Comments, parent?: Node): Comment;
}
```

---

## 基础组件生成 (`basic.ts`)

提供从低层到高层的多层封装函数。

### 图级构造

| 函数 | 说明 |
| :--- | :--- |
| `graph_body(body)` | 封装节点列表为完整 GIA 图对象 |

### 高层构造（推荐）

| 函数 | 说明 |
| :--- | :--- |
| `node_type_node_body(body)` | 基于 `NodePins` 自动生成节点 |
| `node_type_pin_body(body)` | 基于 `NodeType` 构建引脚 |

### 中层构造

| 函数 | 说明 |
| :--- | :--- |
| `node_body(body)` | 手动构造节点 |
| `pin_body(body)` | 手动构造引脚 |
| `list_pin_body(body)` | 构造列表引脚 |
| `map_pin_body(body)` | 构造字典引脚 |

### 低层值构造

| 函数 | 说明 |
| :--- | :--- |
| `int_pin_body(val)` | 整数值 |
| `float_pin_body(val)` | 浮点值 |
| `bool_pin_body(val)` | 布尔值 |
| `string_pin_body(val)` | 字符串值 |
| `vector_pin_body(vec)` | 向量值 |
| `enum_value(body)` | 枚举值 |

---

## 节点信息提取 (`extract.ts`)

```typescript
import { get_nodes, get_node_info, get_pin_info } from "./extract";
import { decode_gia_file } from "../protobuf/decode";

const root = decode_gia_file("./input.gia");
const nodes = get_nodes(root);
const info = get_node_info(nodes[0]);
```

| 函数 | 说明 |
| :--- | :--- |
| `get_nodes(graph)` | 获取节点图的全部节点列表 |
| `get_node_info(node)` | 获取节点及其引脚的详细信息 |
| `get_pin_info(pin)` | 获取引脚的详细信息 |

---

## 工具函数 (`utils.ts`)

| 函数/常量 | 说明 |
| :--- | :--- |
| `Counter` | 单调递增计数器类 |
| `randomInt(len, starting?)` | 生成指定长度的随机整数 |
| `randomName(words?)` | 生成随机英文名称 |
| `DEBUG` | 是否显示警告输出 |
| `STRICT` | 是否在错误时中断 |

```typescript
const uid = randomInt(9, "201");        // 如 201483726
const graph_id = randomInt(10, "102");  // 如 1024839172
const name = randomName(3);              // 如 "happy blue sky"
```

---

## 使用示例

### 创建并连接节点

```typescript
const graph = new Graph("server");

const n1 = graph.add_node(NODE_ID.When_Entity_Is_Created);
const n2 = graph.add_node(NODE_ID.Teleport_Player);
const n3 = graph.add_node(NODE_ID.Create_3D_Vector);
const n4 = graph.add_node(NODE_ID.Get_Self_Entity);

// 执行流连接
graph.flow(n1, n2);

// 数据连接
graph.connect(n3, n2, 0, 1);  // n3 输出 0 → n2 输入 1
graph.connect(n4, n2, 0, 0);  // n4 输出 0 → n2 输入 0

// 设置值
n2.setVal(2, [1, 2, 3]);
n3.setVal(0, 4);

graph.autoLayout();
encode_gia_file("./out.gia", graph.encode());
```

### 加载并修改现有图

```typescript
import { decode_gia_file, encode_gia_file } from "../protobuf/decode";

const root = decode_gia_file("./input.gia");
const graph = Graph.decode(root);

// 修改节点
const nodes = graph.get_nodes();
nodes[0].setPos(0, 0);

// 保存
encode_gia_file("./modified.gia", graph.encode());
```

---

## 设计理念

- **多层封装**: 从自动化到手动，适应不同精度需求
- **强类型**: 所有构造均依赖明确的 interface 和枚举
- **可扩展**: 节点、引脚、值类型均可自由拓展

---

## 开发计划

| 功能 | 状态 |
| :--- | :--- |
| 类管理节点图 | ✅ 完成 |
| 加载现有图并修改 | ✅ 完成 |
| 节点连接管理 | ✅ 完成 |
| 注释和图变量 | ✅ 完成 |
| 结构体管理 | ⏳ 计划中 |

---

## 相关模块

- [Protobuf 工具](../protobuf/readme.md) — GIA 文件编解码
- [节点数据](../node_data/readme.md) — 节点 ID 和类型定义
- [主 README](../readme.md) — 工具库概述
