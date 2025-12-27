# Node Data and Definitions (`node_data`)

This directory contains all the **static definitions** and resource data required by the converter. This data is primarily used for node graph parsing, type inference, and reflection mechanisms.

Resources are uniformly exported via `index.ts`, and some original definition files might be removed during publishing.

---

## File Description

| File | Description | Size |
| :--- | :--- | :--- |
| [`index.yaml`](./index.yaml) / [`index.json`](./index.json) | Complete Data Summary | ~1MB |
| [`node_id.ts`](./node_id.ts) | Node ID Mapping Table | ~200KB |
| [`node_pin_records.ts`](./node_pin_records.ts) | Node Pin Definition Records | ~157KB |
| [`enum_id.ts`](./enum_id.ts) | Enum ID and Value Definitions | ~15KB |
| [`types_list.ts`](./types_list.ts) | Variable Type Definition List | ~8KB |
| [`concrete_map.ts`](./concrete_map.ts) | Generic Node Type Mapping Table | ~8KB |
| [`helpers.ts`](./helpers.ts) | Helper Function Library | ~5KB |
| [`index.ts`](./index.ts) | Unified Export | ~1KB |

---

## Core Resources

### [index.yaml](./index.yaml) / [index.json](./index.json)

**Complete Data Summary**

A single-file complete data summary provided in YAML/JSON format.
- Highly structured version containing all the scattered definitions below
- Suitable for direct reading and processing by external programs

### [node_pin_records.ts](./node_pin_records.ts)

**Node Pin Definition Records**

Contains detailed definitions for all **Reflective Nodes** and regular nodes.

```typescript
interface SingleNodeData {
  id: number;           // 泛型节点 ID
  name: string;         // 节点名称
  inputs: NodePin[];    // 输入引脚列表
  outputs: NodePin[];   // 输出引脚列表
  reflectMap?: [number, number[]][]; // 具体 ID 到类型的映射
}
```

### [node_id.ts](./node_id.ts)

**Node ID Mapping Table**

Provides a complete mapping from node names to node IDs.

```typescript
export const NODE_ID = {
  When_Entity_Is_Created: 1,
  Log_Message: 2,
  Add_Int: 100,
  Add_Float: 101,
  Add__Generic: 99, // 泛型节点
  // ...
} as const;
```

### [enum_id.ts](./enum_id.ts)

**Enum ID and Value Definitions**

```typescript
export const ENUM_ID = {
  Comparison_Operators: 1,
  Rounding_Mode: 2,
  // ...
} as const;

export const ENUM_VALUE = {
  ComparisonOperators_EqualTo: 0,
  ComparisonOperators_NotEqualTo: 1,
  // ...
} as const;
```

### [types_list.ts](./types_list.ts)

**Variable Type Definition List**

Defines all available variable types and their properties in the system.

```typescript
interface TypeDef {
  id: number;      // VarType 枚举值
  name: string;    // 内部名称
  display: string; // 显示名称
  expr: string;    // 表达式 (如 "L<Int>")
  dsl: string;     // DSL 名称
}
```

### [concrete_map.ts](./concrete_map.ts)

**Generic Node Type Mapping Table**

Defines the index order of generic node pins under different type selections.

```typescript
interface ConcreteMap {
  maps: number[][];  // 类型 ID 列表
  pins: Map<string, number>; // "nodeId:pinType:pinIndex" → mapIndex
}
```

---

## Helper Functions (`helpers.ts`)

### Type Mapping Functions

| Function | Description |
| :--- | :--- |
| `get_concrete_index(generic_id, pin_type, pin_index, type)` | Gets the concrete type index of a generic pin |
| `get_concrete_type(generic_id, pin_type, pin_index, index)` | Gets the concrete type by index |
| `get_concrete_map(generic_id, pin_type, pin_index)` | Gets the type mapping table for a pin |
| `is_concrete_pin(generic_id, pin_type, pin_index)` | Checks if it is a reflective pin |

### Node Record Functions

| Function | Description |
| :--- | :--- |
| `get_node_record(concrete_id)` | Gets the node record by concrete ID |
| `get_node_record_generic(generic_id)` | Gets the node record by generic ID |
| `get_generic_id(concrete_id)` | Converts a concrete ID to a generic ID |
| `is_generic_id(id)` | Checks if it is a valid generic ID |
| `get_node_name_from_id(id)` | Gets the node name by ID |

---

## Usage Examples

### Querying Node Information

```typescript
import { NODE_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);

console.log(record?.name);    // "Log_Message"
console.log(record?.inputs);  // 输入引脚列表
console.log(record?.outputs); // 输出引脚列表
```

### Querying Enum Values

```typescript
import { ENUM_ID, ENUM_VALUE } from "./node_data";

const enumType = ENUM_ID.Comparison_Operators;
const equalTo = ENUM_VALUE.ComparisonOperators_EqualTo;
```

### Handling Generic Nodes

```typescript
import { get_concrete_index, get_generic_id } from "./node_data/helpers";

// 获取 Add_Int 的泛型 ID
const genericId = get_generic_id(NODE_ID.Add_Int);

// 获取类型索引
const typeIndex = get_concrete_index(genericId, 0, 0, VarType.Int);
```

---

## Data Source

This data is extracted from game assemblies by scripts in the `extracting_nodes` directory, and then processed and generated.

> **Note**: Other files in this directory are intermediate products or source files from the generation process, and may not be included in the release version.

---

## Related Modules

- [GIA Generator](../gia_gen/readme.md) — Builds graphs using node data
- [Protobuf Tools](../protobuf/readme.md) — GIA file encoding/decoding
- [Main README](../readme.md) — Toolkit Overview