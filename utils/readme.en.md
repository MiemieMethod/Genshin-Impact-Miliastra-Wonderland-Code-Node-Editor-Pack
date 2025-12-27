# Utility Library (`utils`)

This directory contains a series of auxiliary tools, generators, and reference data, used to support GIA file processing, DSL type generation, and node graph operations.

## Directory Index

| Directory | Description | Status |
| :--- | :--- | :--- |
| **[`functions`](./functions/readme.en.md)** | DSL Function Definitions and Type Generation Tools | Active |
| **[`gia_gen`](./gia_gen/readme.en.md)** | GIA Node Graph Programmatic Construction Tools | Active |
| **[`node_data`](./node_data/readme.en.md)** | Node Static Data: ID, Enums, Pin Definitions | Active |
| **[`protobuf`](./protobuf/readme.en.md)** | GIA Protobuf Definitions and Codec Tools | Active |
| `extracting_nodes` | Node Definition Extraction Script | **Internal / Unsynced** |
| `ref` | Reference Files (Sample GIA, Decompiled Code) | Reference |

---

## Quick Start

### Reading and Writing GIA Files

```typescript
import { decode_gia_file, encode_gia_file } from "./protobuf/decode";

// 读取
const data = decode_gia_file("./path/to/file.gia");
console.log(data.graph);

// 写入
encode_gia_file("./output.gia", data);
```

### Programmatically Creating Node Graphs

```typescript
import { Graph, NODE_ID } from "./index";
import { encode_gia_file } from "./protobuf/decode";

const graph = new Graph();
const trigger = graph.add_node(NODE_ID.When_Entity_Is_Created);
const log = graph.add_node(NODE_ID.Log_Message);

graph.flow(trigger, log);
log.setVal(0, "Hello World!");

graph.autoLayout();
encode_gia_file("./hello.gia", graph.encode());
```

### Querying Node Data

```typescript
import { NODE_ID, ENUM_ID, get_node_record } from "./node_data";

const id = NODE_ID.Log_Message;
const record = get_node_record(id);
console.log(record?.inputs, record?.outputs);
```

---

## Main Exports (`index.ts`)

This file unifies the export of commonly used modules:

| Module | Description |
| :--- | :--- |
| `gia_gen/*` | Graph, Node, Pin, Connect classes, etc. |
| `node_data/*` | NODE_ID, ENUM_ID, helpers |
| `protobuf/decode` | decode_gia_file, encode_gia_file |

**Usage Example:**
```typescript
import { Graph, Node, helper, decode_gia_file } from "./utils";
```

---

## Core Files

### `gen_def.ts` — DSL Type Definition Generator

Reads function definitions from `functions/math.ts`, automatically generates the `def.d.ts` file, providing IDE autocompletion for DSL development.

```bash
node utils/gen_def.ts
```

**Features:**
- Parses function definitions (overloads, generics, parameters)
- Generates TypeScript declaration files
- Supports system enums and custom types

### `utils.ts` — General Utilities

```typescript
import { DEBUG, STRICT, panic } from "./utils";

DEBUG;   // Whether to display warnings
STRICT;  // Whether to break on errors

panic("message"); // Throws an error and prints
```

---

## Module Details

### [Function Definition Tools (`functions`)](./functions/readme.en.md)

Defines Math and Query nodes in DSL, supporting overloads and generics.

**Core Files:**
- `math.ts` — Function definition list
- `function_defs.ts` — Parser and type system
- `utils.ts` — Helper functions

### [GIA Generator (`gia_gen`)](./gia_gen/readme.en.md)

High-level API for programmatically building GIA node graphs.

**Core Classes:**
- `Graph` — Graph manager
- `Node` — Node instance
- `Pin` — Pin instance
- `Connect` — Connection instance

**Core Functions:**
- `graph_body()` — Creates graph structure
- `node_body()` — Creates nodes
- `get_nodes()` — Extracts node list

### [Node Data (`node_data`)](./node_data/readme.en.md)

Static node definitions and ID mappings.

**Core Files:**
- `node_id.ts` — Node Name → ID
- `enum_id.ts` — Enum definitions
- `node_pin_records.ts` — Pin definitions
- `helpers.ts` — Query helper functions

### [Protobuf Tools (`protobuf`)](./protobuf/readme.en.md)

Protobuf definitions and codec for GIA files.

**Core Files:**
- `gia.proto` — Protobuf structure definitions
- `decode.ts` — TypeScript codec
- `gia.proto.ts` — Automatically generated TS types

---

## File Visibility

According to `sync-list.json`, the following content **will not be synced** to the public branch:

| Path | Reason |
| :--- | :--- |
| `utils/extracting_nodes/**` | Internal node extraction tools |
| `utils/**/ref/**` | Reference files |
| `utils/node_data/yaml/**` | Intermediate data |
| `utils/functions/tools.ts` | Internal tools |
| `utils/functions/check.ts` | Validation script |
| `**/test/**`, `**/temp/**` | Test and temporary files |

---

## Related Documentation

- [Source Code](../src/readme.md) — Parsers and Converters
- [Main README](../Readme.md) — Project Overview
- [DSL User Manual](../docs/UserGuide.md)