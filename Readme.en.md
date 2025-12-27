# Miliastra Wonderland Node Graph Toolset

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**A comprehensive toolset for Genshin Impact Miliastra Wonderland node graph development**

*A complete solution from low-level file parsing to high-level code generation*

[Quick Start](#quick-start) · [Core Features](#core-features) · [Documentation](#module-documentation) · [Development Progress](#development-progress)

</div>

---

## ✨ Features

- 🔧 **GIA File Read/Write** — Programmatically read and write `.gia` node graph files using TypeScript
- 📝 **DSL Code Language** — Describe node graphs as code, enjoying IDE intelligent completion and syntax highlighting
- 🔄 **Bidirectional Converters** — Complete DSL ⇔ IR ⇔ GIA compile/decompile toolchain
- 📊 **Comprehensive Node Data** — Programmatically organized node IDs, enum values, and pin definitions
- 🧩 **High-Level API** — `Graph` class encapsulation for easy creation and modification of node graphs
- 🎯 **Type Safety** — Extensive TypeScript type definitions and compile-time checks

---

## Core Features

### 1. GIA File Read/Write

Programmatically read and write `.gia` files using TypeScript, supporting full encoding/decoding and graph operations.

```typescript
import { decode_gia_file, encode_gia_file, Graph, NODE_ID } from "./utils";

// Read an existing file
const data = decode_gia_file("./input.gia");
const graph = Graph.decode(data);

// Or create a new graph
const newGraph = new Graph("server");
const trigger = newGraph.add_node(NODE_ID.When_Entity_Is_Created);
const log = newGraph.add_node(NODE_ID.Log_Message);

// Connect nodes
newGraph.flow(trigger, log);
log.setVal(0, "Hello World!");

// Auto-layout and save
newGraph.autoLayout();
encode_gia_file("./output.gia", newGraph.encode());
```

📖 Details: [GIA Generator](./utils/gia_gen/readme.en.md) | [Protobuf Utilities](./utils/protobuf/readme.en.md)

### 2. DSL Code Writing

Use a TypeScript-based Domain Specific Language (DSL) to describe node graph logic in code, enjoying IDE intelligent completion, syntax highlighting, and version control advantages.

```typescript
// Triggered when game object is created
[OnCreate()]
  .Log("I'm alive!")
  .SetVal(Self.hp, 10000);

// Triggered when a signal is received
[Signal(Signal.PlayerHit)[dmg]]
  .$((dmg) => dmg * node.critical)[real_dmg]
  .SetVal(Self.hp, Self.hp - real_dmg)
  .If(Self.hp <= 0)(
    true = Log("You died"),
    false = Log("Ouch!")
  );

// Loops and branches
[Timer(Timer.countdown)]
  .Loop(0n, 9n, "spawn")[i](
    true = SpawnEnemy(i),
    false = Log("All spawned") >> 0()
  ).Log("Loop complete");
```

📖 Details: [DSL User Guide](./docs/UserGuide.en.md) | [Language Design](./docs/SystemDesign.en.md) | [Function Definitions](./utils/functions/readme.en.md)

### 3. Parser and Converter

A complete compile/decompile toolchain supporting mutual conversion between DSL text, Intermediate Representation (IR), and GIA node graphs.

```typescript
import { createParserState, parse, decompile } from "./src/parser";
import { giaIrConvertor } from "./src/convertor";

// DSL → IR
const state = createParserState(sourceCode);
const ir = parse(state);

// IR → DSL
const code = decompile(ir);

// GIA → IR
const irModule = giaIrConvertor(giaGraph, true);
```

```
┌─────────┐      parse       ┌──────┐     giaIrConvertor    ┌─────────┐
│   DSL   │ ───────────────► │  IR  │ ◄──────────────────── │   GIA   │
│  Code   │ ◄─────────────── │  AST │ ────────────────────► │  Graph  │
└─────────┘     decompile    └──────┘     (WIP)             └─────────┘
```

📖 Details: [Parser](./src/parser/readme.en.md) | [Converter](./src/convertor/readme.en.md) | [IR Types](./src/types/readme.en.md)

### 4. Complete Node Data

Programmatically organized server and client node data, including complete ID mappings, enum definitions, and pin information.

```typescript
import { NODE_ID, ENUM_ID, ENUM_VALUE, get_node_record } from "./utils/node_data";

// Query node information
const id = NODE_ID.Add_Float;
const record = get_node_record(id);
console.log(record?.name, record?.inputs, record?.outputs);

// Use enums
const compOp = ENUM_VALUE.ComparisonOperators_EqualTo;
```

| Data Type | Description | Format |
| :--- | :--- | :--- |
| Node ID | Names and IDs of 770+ nodes | TypeScript |
| Enum Definitions | 60+ enum types and values | TypeScript |
| Pin Records | Input/output pin definitions for all nodes | TypeScript |
| Type Mappings | Type index table for generic nodes | TypeScript |
| Comprehensive Data | Structured summary of the above data | YAML / JSON |

📖 Details: [Node Data](./utils/node_data/readme.en.md)

---

## Project Structure

```
.
├── src/                          # Core Source Code
│   ├── convertor/                # GIA ⇔ IR Converter
│   │   ├── gia_ir.ts             #     Conversion entry point
│   │   ├── gia_ir_raw.ts         #     Raw IR builder
│   │   └── graph_chain_split.ts  #  Graph structure analysis algorithm
│   ├── parser/                 # DSL Parser
│   │   ├── tokenizer.ts        #     Lexical analysis
│   │   ├── parser.ts           #     Syntax analysis
│   │   ├── decompiler.ts       #     IR → DSL decompiler
│   │   └── parse_*.ts          #     Sub-parsers
│   └── types/                  # IR Type Definitions
│       ├── IR*.ts              #     IR node types
│       ├── types.ts            #     Base types
│       └── consts.ts           #     Constant definitions
│ 
├── utils/                      # Utility Library
│   ├── gia_gen/                # GIA Graph Generator
│   │   ├── graph.ts            #     Graph class (recommended)
│   │   ├── basic.ts            #     Basic component generation
│   │   ├── nodes.ts            #     Node generators
│   │   ├── auto_layout.ts      #     Auto-layout algorithm
│   │   └── ......              #     Other components
│   ├── node_data/              # Static Node Data
│   │   ├── node_id.ts          #     Node ID mappings
│   │   ├── enum_id.ts          #     Enum definitions
│   │   ├── data.ts             #     All data information
│   │   ├── helpers.ts          #     Query helper functions
│   │   └── ......              #     Other static definitions
│   ├── protobuf/               # Protobuf Utilities
│   │   ├── gia.proto           #     Protobuf structure definition
│   │   ├── decode.ts           #     TypeScript encoding/decoding (standard structure)
│   │   ├── decode.py           #     Python encoding/decoding (can display unknown fields)
│   │   └── gia.proto.ts        #     Auto-generated types
│   ├── functions/              # DSL Function Definitions
│   │   ├── math.ts             #     Function definition list
│   │   └── function_defs.ts    #     Type system and parser
│   └── gen_def.ts              # DSL Type Definition Generator
│
├── docs/                       # User Documentation
│   ├── UserGuide.md            # DSL User Manual
│   ├── SystemDesign.md         # Language Design Document
│   └── dsl.enbf                # DSL grammar specification
│
├── test.CI/                    # CI Test Cases (run by github actions)
└── static/                     # Image Resources (for Readme.md display)
```

---

## Quick Start

### Environment Requirements

- **Node.js** 23.6+
- **npm** or **pnpm**

### Install Dependencies

```bash
npm install
```

### Run Examples

```bash
// In progress, no full examples yet
```

### Quick Usage

**1. Read and modify an existing GIA file**

```typescript
import { decode_gia_file, encode_gia_file, Graph } from "./utils";

const data = decode_gia_file("./myGraph.gia");
const graph = Graph.decode(data);

// Modify node position
graph.get_nodes()[0].setPos(100, 200);

// Add a comment
graph.add_comment("This is a test node", 100, 150);

// Save
encode_gia_file("./myGraph_modified.gia", graph.encode());
```

**2. Create a node graph from scratch**

```typescript
import { Graph, NODE_ID, encode_gia_file } from "./utils";

const graph = new Graph("server");

// Add trigger and function nodes
const onCreate = graph.add_node(NODE_ID.When_Entity_Is_Created);
const getPlayer = graph.add_node(NODE_ID.Get_Player_Entity);
const teleport = graph.add_node(NODE_ID.Teleport_Player);

// Connect execution flow
graph.flow(onCreate, getPlayer);
graph.flow(getPlayer, teleport);

// Connect data flow
graph.connect(getPlayer, teleport, 0, 0); // Entity output → Teleport target

// Set parameters
teleport.setVal(1, [100, 0, 50]); // Target coordinates

// Layout and save
graph.autoLayout();
encode_gia_file("./newGraph.gia", graph.encode());
```

---

## Module Documentation

### Core Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **Source Code** | Parser, converter, type definitions | [src/readme.md](./src/readme.en.md) |
| **Utility Library** | GIA generation, node data, Protobuf | [utils/readme.md](./utils/readme.en.md) |

### Utility Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **DSL Functions** | Math/Query node definitions and type generation | [functions/readme.md](./utils/functions/readme.en.md) |
| **GIA Generator** | Programmatic construction and manipulation of node graphs | [gia_gen/readme.md](./utils/gia_gen/readme.en.md) |
| **Node Data** | ID, enum, pin reflection data | [node_data/readme.md](./utils/node_data/readme.en.md) |
| **Protobuf** | GIA file encoding/decoding | [protobuf/readme.md](./utils/protobuf/readme.en.md) |

### User Documentation

| Document | Description |
| :--- | :--- |
| [DSL User Guide](./docs/UserGuide.en.md) | Complete guide to DSL syntax |
| [Language Design](./docs/SystemDesign.en.md) | Language design philosophy and implementation details |
| [TODO.md](./TODO.en.md) | Development plan and progress tracking |

---

## GIA File Format

`.gia` files are the binary storage format for Genshin Impact Miliastra Wonderland node graphs, serialized using Protobuf.

![GIA File Structure](./static/image.png)

| Field | Offset | Value | Description |
| :--- | :--- | :--- | :--- |
| File Size | 0x00 | `size - 4` | Total file size minus 4 bytes |
| Version | 0x04 | `0x01` | Fixed value |
| Header Mark | 0x08 | `0x0326` | **Strict validation** |
| File Type | 0x0C | `0x03` | GIA = 3 |
| Content Length | 0x10 | `size - 24` | Protobuf data length |
| Protobuf | 0x14 | ... | Serialized node graph data |
| Footer Mark | End | `0x0679` | **Strict validation** |

📖 Protobuf detailed structure: [gia.proto](./utils/protobuf/gia.proto)

---

## Development Progress

### Completed ✅

| Feature | Status | Description |
| :--- | :--- | :--- |
| GIA file reverse engineering | ✅ Done | Complete file format parsing |
| GIA file read/write API | ✅ Done | TypeScript + Python tools |
| Graph high-level API | ✅ Done | Node, connection, comment, variable management |
| DSL syntax design | ✅ Done | Complete syntax specification |
| DSL → IR parser | ✅ Done | Lexical analysis + syntax analysis |
| IR → DSL decompiler | ✅ Done | Full decompilation support |
| Auto-layout algorithm | ✅ Done | Dagre-based auto-layout |
| Node data organization | ✅ Done | 770+ nodes, 40+ enums |
| CI automated testing | ✅ Done | Parser consistency testing |

### In Progress ⏳

| Feature | Status | Description |
| :--- | :--- | :--- |
| GIA → IR converter | ⏳ In Progress | Raw mode already supported, optimizing |
| IR → GIA converter | ⏳ In Progress | Constructing Graph from IR |
| Client node support | ⏳ In Progress | Handling ID and enum differences |

### Planned 📋

| Feature | Description |
| :--- | :--- |
| VSCode language extension | Syntax highlighting and intelligent completion for `.dsl.ts` files |
| Compiler type inference | Automatic type inference for DSL expressions |
| Execution simulation | Local simulation of node graph logic |

More plans available in [TODO.md](./TODO.en.md)

---

## File Visibility

According to [sync-list.json](./sync-list.json), the following content is only visible on the development branch (`dev`):

| Path | Reason |
| :--- | :--- |
| `utils/extracting_nodes/` | Internal node extraction tool |
| `utils/**/ref/**` | Reference files |
| `utils/node_data/yaml/**` | Intermediate data |
| `**/test/**`, `**/temp/**` | Test and temporary files |
| `utils/functions/tools.ts` | Internal tools |

---

## Related Projects

| Project | Description |
| :--- | :--- |
| [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) | Web-based node editor |
| [genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format) | Introduction to `gil` and other file formats |

---

## Contribution

Contributions, bug reports, or suggestions are welcome!

- 🐛 **Bug Reports**: [Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 💡 **Feature Suggestions**: [Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 📧 **Contact Author**: [wuyijun21@mails.ucas.ac.cn](mailto:wuyijun21@mails.ucas.ac.cn)

## License

[MIT License](./LICENSE) © 2025 Wu-Yijun