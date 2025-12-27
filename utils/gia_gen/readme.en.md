# GIA Generator (`gia_gen`)

This directory provides a toolkit for quickly generating and manipulating GIA node graph files. It simplifies the creation of complex node graph structures through a simple API.

---

## File Description

| File | Description | Status |
| :--- | :--- | :--- |
| [`graph.ts`](./graph.ts) | Graph structure modeling and serialization (**Recommended**) | Active |
| [`basic.ts`](./basic.ts) | Basic component generation functions | Active |
| [`extract.ts`](./extract.ts) | Node information extraction | Active |
| [`nodes.ts`](./nodes.ts) | Node type definitions | Active |
| [`utils.ts`](./utils.ts) | Utility functions and counters | Active |
| [`auto_layout.ts`](./auto_layout.ts) | Automatic layout algorithm | Active |

---

## Quick Start

```typescript
import { Graph, NODE_ID, encode_gia_file } from "../index";

// Create graph
const graph = new Graph("server");

// Add nodes
const trigger = graph.add_node(NODE_ID.When_Entity_Is_Created);
const log = graph.add_node(NODE_ID.Log_Message);

// Connect execution flow
graph.flow(trigger, log);

// Set parameters
log.setVal(0, "Hello World!");

// Auto layout
graph.autoLayout();

// Save
encode_gia_file("./output.gia", graph.encode());
```

---

## Core Classes

### `Graph` — Node Graph Manager

```typescript
class Graph {
  constructor(type: "server" | "client" | "composite" = "server");
  
  // Node management
  add_node(node_id: number): Node;
  get_nodes(): Node[];
  get_node(unique_id: number): Node | null;
  
  // Connection management
  flow(from: Node, to: Node, from_index?: number, to_index?: number): void;
  connect(from: Node, to: Node, from_index: number, to_index: number): void;
  disconnect(connect: Connect): void;
  get_connects(): Connect[];
  get_flows(): Connect[];
  
  // Comment management
  add_comment(content: string, x?: number, y?: number): Comment;
  get_graph_comments(): Comment[];
  
  // Graph variables
  add_graph_var(name: string, type: NodeType, exposed?: boolean): GraphVar | null;
  get_graph_var(name: string): GraphVar | undefined;
  
  // Serialization
  encode(opt?: EncodeOptions): Root;
  static decode(root: Root): Graph;
  
  // Layout
  autoLayout(distance?: number, separation?: number): void;
}
```

### `Node` — Node Instance

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

### `Pin` — Pin Instance

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

### `Connect` — Connection Instance

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

### `Comment` — Comment Instance

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

## Basic Component Generation (`basic.ts`)

Provides multi-layered encapsulation functions from low-level to high-level.

### Graph-Level Construction

| Function | Description |
| :--- | :--- |
| `graph_body(body)` | Encapsulates node lists into a complete GIA graph object |

### High-Level Construction (Recommended)

| Function | Description |
| :--- | :--- |
| `node_type_node_body(body)` | Automatically generates nodes based on `NodePins` |
| `node_type_pin_body(body)` | Builds pins based on `NodeType` |

### Mid-Level Construction

| Function | Description |
| :--- | :--- |
| `node_body(body)` | Manually constructs nodes |
| `pin_body(body)` | Manually constructs pins |
| `list_pin_body(body)` | Constructs list pins |
| `map_pin_body(body)` | Constructs map pins |

### Low-Level Value Construction

| Function | Description |
| :--- | :--- |
| `int_pin_body(val)` | Integer value |
| `float_pin_body(val)` | Float value |
| `bool_pin_body(val)` | Boolean value |
| `string_pin_body(val)` | String value |
| `vector_pin_body(vec)` | Vector value |
| `enum_value(body)` | Enum value |

---

## Node Information Extraction (`extract.ts`)

```typescript
import { get_nodes, get_node_info, get_pin_info } from "./extract";
import { decode_gia_file } from "../protobuf/decode";

const root = decode_gia_file("./input.gia");
const nodes = get_nodes(root);
const info = get_node_info(nodes[0]);
```

| Function | Description |
| :--- | :--- |
| `get_nodes(graph)` | Gets the list of all nodes in a node graph |
| `get_node_info(node)` | Gets detailed information about a node and its pins |
| `get_pin_info(pin)` | Gets detailed information about a pin |

---

## Utility Functions (`utils.ts`)

| Function/Constant | Description |
| :--- | :--- |
| `Counter` | Monotonically increasing counter class |
| `randomInt(len, starting?)` | Generates a random integer of specified length |
| `randomName(words?)` | Generates a random English name |
| `DEBUG` | Whether to display warning output |
| `STRICT` | Whether to interrupt on error |

```typescript
const uid = randomInt(9, "201");        // e.g., 201483726
const graph_id = randomInt(10, "102");  // e.g., 1024839172
const name = randomName(3);              // e.g., "happy blue sky"
```

---

## Usage Examples

### Create and Connect Nodes

```typescript
const graph = new Graph("server");

const n1 = graph.add_node(NODE_ID.When_Entity_Is_Created);
const n2 = graph.add_node(NODE_ID.Teleport_Player);
const n3 = graph.add_node(NODE_ID.Create_3D_Vector);
const n4 = graph.add_node(NODE_ID.Get_Self_Entity);

// Execution flow connection
graph.flow(n1, n2);

// Data connection
graph.connect(n3, n2, 0, 1);  // n3 output 0 → n2 input 1
graph.connect(n4, n2, 0, 0);  // n4 output 0 → n2 input 0

// Set value
n2.setVal(2, [1, 2, 3]);
n3.setVal(0, 4);

graph.autoLayout();
encode_gia_file("./out.gia", graph.encode());
```

### Load and Modify Existing Graph

```typescript
import { decode_gia_file, encode_gia_file } from "../protobuf/decode";

const root = decode_gia_file("./input.gia");
const graph = Graph.decode(root);

// Modify node
const nodes = graph.get_nodes();
nodes[0].setPos(0, 0);

// Save
encode_gia_file("./modified.gia", graph.encode());
```

---

## Design Philosophy

- **Multi-layered encapsulation**: From automated to manual, adapting to different precision requirements
- **Strong typing**: All constructions rely on clear interfaces and enums
- **Extensibility**: Nodes, pins, and value types can be freely extended

---

## Development Plan

| Feature | Status |
| :--- | :--- |
| Class-managed node graph | ✅ Completed |
| Load existing graph and modify | ✅ Completed |
| Node connection management | ✅ Completed |
| Comments and graph variables | ✅ Completed |
| Struct management | ⏳ Planned |

---

## Related Modules

- [Protobuf Tools](../protobuf/readme.md) — GIA file encoding and decoding
- [Node Data](../node_data/readme.md) — Node ID and type definitions
- [Main README](../readme.md) — Toolkit overview