# Genshin Impact: Miliastra Wonderland Node Graph Toolkit

> [!IMPORTANT]  
> Note: The current underlying data and interface framework have undergone a refactor v2. While the main interfaces largely remain unchanged, the internal structure has been almost entirely adjusted. If you are using code from 2025, please upgrade as soon as possible, as subsequent interfaces and data may not stably support past usage.

*Test cases and documentation are being updated synchronously*

<div align="center">

[Chinese Documentation](Readme.en.md) | [English Documentation](Readme.en.en.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**A comprehensive toolkit for Genshin Impact: Miliastra Wonderland node graph development**

*A complete solution from underlying file parsing to upper-level code authoring*

[Quick Start](#quick-start) · [Core Features](#core-features) · [Documentation](#module-documentation) · [Development Progress](#development-progress)

</div>

---

## ✨ Feature Highlights

- 🔧 **GIA File Read/Write** — Programmatically read and write `gia` node graph files using TypeScript
- 📝 **DSL Code Language** — Describe node graphs as code, enjoying IDE intelligent completion and syntax highlighting
- 🔄 **Bidirectional Converter** — Complete DSL ⇔ IR ⇔ GIA compilation/decompilation toolchain
- 📊 **Comprehensive Node Data** — Centralized data management, 500+ node definitions, complete type system
- 🧩 **High-Level API** — `Graph` class encapsulation for easy node graph construction and modification
- 🎯 **Type Safety** — Comprehensive TypeScript type definitions and compile-time checks
- 🔍 **Reverse Engineering Tools** — Complete Protobuf validation and analysis toolchain

---

## Core Features

### 1. GIA File Read/Write

Programmatically read and write `.gia` files using TypeScript, supporting complete encoding/decoding and graph operations.

```typescript
import { Graph, NODES } from "./utils/index.ts";
import { decode_gia_file, encode_gia_file } from "./utils/protobuf/decode.ts";

// Read existing file
const bundle = decode_gia_file("input.gia");
const graph = Graph.decode(bundle);

// Or create a new graph
const newGraph = new Graph("ENTITY_NODE_GRAPH");
const trigger = newGraph.add_node(NODES.Trigger_Tab_OnTabSelect);
const branch = newGraph.add_node(NODES.Control_General_Branch);

// Connect nodes
newGraph.flow(trigger, branch);
newGraph.connect(trigger, branch, "Output0", "cond");
branch.setVal("cond", true);

// Auto-layout and save
newGraph.autoLayout();
encode_gia_file("output.gia", newGraph.encode());
```

📖 Details: [GIA Generator](./utils/gia_gen/readme.en.md) | [Protobuf Tools](./utils/protobuf/README.en.md) | [Node Data](./utils/node_data/readme.en.md)

### 2. DSL Code Authoring

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

// Loop and branch
[Timer(Timer.countdown)]
  .Loop(0n, 9n, "spawn")[i](
    true = SpawnEnemy(i),
    false = Log("All spawned") >> 0()
  ).Log("Loop complete");
```

📖 Details: [DSL User Guide](./docs/UserGuide.en.md) | [Language Design](./docs/SystemDesign.en.md)

### 3. Parser and Converter

A complete compilation/decompilation toolchain, supporting mutual conversion between DSL text, Intermediate Representation (IR), and GIA node graphs.

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
└─────────┘     decompile    └──────┘     (In Progress)     └─────────┘
```

📖 Details: [Parser](./src/parser/readme.en.md) | [Converter](./src/convertor/readme.en.md) | [IR Types](./src/types/readme.en.md)

### 4. Comprehensive Node Data

A thoroughly refactored centralized data system, where all node definitions, type systems, and enum values are uniformly managed in [data.json](cci:7://file:///d:/Program/GenshinImpact/projs/Convertor/utils/node_data/data.json:0:0-0:0).

```typescript
import { NodeLib, NODES } from "./utils/node_data/index.ts";

// Use node constants (with complete documentation comments)
const branchNode = NODES.Control_General_Branch;

// Query node definition
const nodeDef = NodeLib.getByIdentifier(branchNode);
console.log(nodeDef.InGameName.en);    // "Double Branch"
console.log(nodeDef.DataPins.length);  // Number of data pins

// Handle variant type nodes
const intEqual = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);
console.log(intEqual.DataPins[0].Type); // "Int" (specialized)
```

**Core Data:**
- [data.json](cci:7://file:///d:/Program/GenshinImpact/projs/Convertor/utils/node_data/data.json:0:0-0:0) - Complete node data (~3.8MB, 500+ node definitions)
- [game_nodes.ts](cci:7://file:///d:/Program/GenshinImpact/projs/Convertor/utils/node_data/game_nodes.ts:0:0-0:0) - Automatically generated node constants (with complete documentation comments)
- Complete type system (type parsing, conversion, reflection)
- Multilingual support (14 languages localized)

📖 Details: [Node Data System](./utils/node_data/readme.en.md)

---

## Project Structure

```
.
├── src/                          # Core Source Code
│   ├── convertor/                # GIA ⇔ IR Converter
│   │   ├── gia_ir.ts             #     GIA → IR Conversion Entry Point
│   │   ├── gia_ir_raw.ts         #     Raw IR Builder
│   │   └── graph_chain_split.ts  #     Graph Structure Analysis Algorithm
│   ├── parser/                   # DSL Parser
│   │   ├── tokenizer.ts          #     Lexical Analysis
│   │   ├── parser.ts             #     Syntax Analysis
│   │   ├── decompiler.ts         #     IR → DSL Decompilation
│   │   └── parse_*.ts            #     Sub-parsers
│   └── types/                    # IR Type Definitions
│       ├── IR*.ts                #     IR Node Types
│       ├── types.ts              #     Base Types
│       └── consts.ts             #     Constant Definitions
│ 
├── utils/                        # Utility Library (Refactored)
│   ├── gia_gen/                  # GIA Graph Generator
│   │   ├── interface.ts          #     Core API (Graph/Node Classes)
│   │   ├── core.ts               #     Low-level Encoding/Decoding Functions
│   │   ├── auto_layout.ts        #     Automatic Layout Algorithm
│   │   ├── example.ts            #     Full Usage Example
│   │   └── display/              #     Visualization Tools
│   ├── node_data/                # Static Node Data (Centralized)
│   │   ├── data.json             #     Complete Node Data (~3.8MB)
│   │   ├── types.ts              #     Data Structure Type Definitions
│   │   ├── node_type.ts          #     Type System Core
│   │   ├── core.ts               #     Type Conversion and Query
│   │   ├── instances.ts          #     Data Access Classes
│   │   ├── game_nodes.ts         #     Node Constants (Auto-generated)
│   │   ├── gen_game_nodes.ts     #     Convenience Interface Generator
│   │   └── UGC-Guide-Markdown/   #     Official Documentation Extraction Results
│   ├── protobuf/                 # Protobuf Toolkit
│   │   ├── gia.proto             #     Core Protobuf Definition
│   │   ├── gia.proto.ts          #     Auto-generated TS Types
│   │   ├── decode.ts             #     Production Environment Encoding/Decoding
│   │   ├── decode-cli.ts         #     Debugging/Reverse Engineering Tools
│   │   ├── decode_raw.ts         #     Raw Protobuf Parsing
│   │   ├── proto2ts.ts           #     Proto → TS Generator
│   │   └── verify_proto.ts       #     Structure Validator
│   ├── functions/                # DSL Function Definitions (Low Priority)
│   ├── index.ts                  # Unified Export Interface
│   ├── utils.ts                  # General Utility Functions
│   └── gen_def.ts                # DSL Type Generator (Low Priority)
│
├── docs/                         # User Documentation
│   ├── UserGuide.md              # DSL User Guide
│   ├── SystemDesign.md           # Language Design Document
│   └── dsl.enbf                  # DSL Grammar Specification
│
├── test.CI/                      # CI Test Cases
└── static/                       # Image Resources
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

### Quick Usage

**1. Read and Modify Existing GIA File**

```typescript
import { decode_gia_file, encode_gia_file, Graph } from "./utils/index.ts";

const bundle = decode_gia_file("myGraph.gia");
const graph = Graph.decode(bundle);

// Modify nodes
graph.nodes.forEach(node => {
  console.log(`Node: ${node.def.Identifier}`);
});

// Add new node
const newNode = graph.add_node(NODES.Control_General_Branch);

// Save
encode_gia_file("myGraph_modified.gia", graph.encode());
```

**2. Create Node Graph from Scratch**

```typescript
import { Graph, NODES, encode_gia_file } from "./utils/index.ts";

const graph = new Graph("ENTITY_NODE_GRAPH");

// Add triggers and function nodes
const trigger = graph.add_node(NODES.Trigger_Tab_OnTabSelect);
const getVar = graph.add_node(NODES.Query_CustomVariable_GetVariable);
const branch = graph.add_node(NODES.Control_General_Branch);

// Connect execution flow
graph.flow(trigger, branch);

// Connect data flow
graph.connect(trigger, getVar, 0, 0);
graph.connect(getVar, branch, 0, "cond");

// Set parameters
getVar.setVal("var_name", "Player Level");

// Layout and save
graph.autoLayout();
encode_gia_file("newGraph.gia", graph.encode());
```

**3. Query Node Data**

```typescript
import { NodeLib, NODES } from "./utils/node_data/index.ts";

// Query node definition
const nodeDef = NodeLib.getByIdentifier(NODES.Control_General_Branch);

console.log(nodeDef.InGameName.en);  // "Double Branch"
console.log(nodeDef.System);         // "Server"
console.log(nodeDef.Domain);         // "Control"

// Iterate through pins
nodeDef.DataPins.forEach(pin => {
  console.log(`${pin.Identifier}: ${pin.Type}`);
});
```

---

## Module Documentation

### Core Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **Source Code** | Parser, converter, IR type definitions | [src/readme.md](./src/readme.en.md) |
| **Utility Library** | GIA generation, node data, Protobuf | [utils/readme.md](./utils/readme.en.md) |

### Utility Modules (Refactored)

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **GIA Generator** | Programmatic construction and manipulation of node graphs | [gia_gen/readme.md](./utils/gia_gen/readme.en.md) |
| **Node Data System** | Centralized data management, complete type system | [node_data/readme.md](./utils/node_data/readme.en.md) |
| **Protobuf Toolkit** | Dual-path encoding/decoding, reverse engineering toolchain | [protobuf/README.md](./utils/protobuf/README.en.md) |
| **DSL Functions** | Math/Query node definitions (low priority) | [functions/readme.md](./utils/functions/readme.en.md) |

### Source Code Modules

| Module | Description | Documentation |
| :--- | :--- | :--- |
| **Parser** | DSL lexical analysis, syntax analysis, decompilation | [parser/readme.md](./src/parser/readme.en.md) |
| **Converter** | GIA ⇔ IR format conversion, graph analysis algorithms | [convertor/readme.md](./src/convertor/readme.en.md) |
| **Type Definitions** | IR node types, Token, constants | [types/readme.md](./src/types/readme.en.md) |

### User Documentation

| Document | Description |
| :--- | :--- |
| [DSL User Guide](./docs/UserGuide.en.md) | Complete guide to DSL syntax |
| [Language Design](./docs/SystemDesign.en.md) | Language design philosophy and implementation details |
| [TODO.md](./TODO.en.md) | Development plan and progress tracking |

---

## Toolchain Workflow

### Complete Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Utility Library (utils)              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  node_data   │───►│   gia_gen    │───►│  protobuf    │  │
│  │  (Data Core) │    │  (Graph Builder) │    │  (Encoding/Decoding)│  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│        │                    │                    │           │
│        │ Node Definitions    │ Graph API         │ GIA File  │
│        ▼                    ▼                    ▼           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Source Code (src)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │    types     │───►│   parser     │───►│  convertor   │  │
│  │  (IR Definitions)│    │  (DSL Parsing)  │    │ (GIA⇔IR)     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                            │                    │           │
│                            │ IR AST            │ IR Module │
│                            ▼                    ▼           │
└─────────────────────────────────────────────────────────────┘
```

### Typical Usage Scenarios

**Scenario 1: Read and Modify GIA File**
```
GIA File → decode_gia_file() → Graph.decode() → Modify nodes 
→ graph.encode() → encode_gia_file() → GIA File
```

**Scenario 2: Create Node Graph from Scratch**
```
new Graph() → add_node(NODES.xxx) → connect() → setVal() 
→ autoLayout() → encode() → encode_gia_file() → GIA File
```

**Scenario 3: DSL Code Compilation (In Progress)**
```
DSL Code → parse() → IR AST → (Converter) → Graph → encode() → GIA File
```

**Scenario 4: Decompile GIA to DSL (In Progress)**
```
GIA File → decode() → Graph → giaIrConvertor() → IR → decompile() → DSL Code
```

---

## GIA File Format

`.gia` files are the binary storage format for Genshin Impact: Miliastra Wonderland node graphs, serialized using Protobuf.

![GIA File Structure](./static/image.png)

| Field | Offset | Value | Description |
| :--- | :--- | :--- | :--- |
| File Size | 0x00 | `size - 4` | Total file size minus 4 bytes |
| Version Number | 0x04 | `0x01` | Fixed Value |
| Header Marker | 0x08 | `0x0326` | **Strict Validation** |
| File Type | 0x0C | `0x03` | GIA = 3 |
| Content Length | 0x10 | `size - 24` | Protobuf data length |
| Protobuf | 0x14 | ... | Serialized node graph data |
| Footer Marker | End | `0x0679` | **Strict Validation** |

📖 Protobuf Detailed Structure: [gia.proto](./utils/protobuf/gia.proto) | [Reverse Engineering Tools Documentation](./utils/protobuf/README.en.md)

---

## Development Progress

### Completed ✅

| Feature | Status | Description |
| :--- | :--- | :--- |
| **Data System Refactoring** | ✅ Completed | Centralized data.json, complete type system |
| GIA File Reverse Engineering | ✅ Completed | Complete file format parsing |
| GIA File Read/Write API | ✅ Completed | TypeScript dual-path encoding/decoding |
| Graph High-Level API | ✅ Completed | Node, connection, comment, variable management |
| Protobuf Reverse Engineering Toolchain | ✅ Completed | decode_raw, proto2ts, verify_proto |
| DSL Syntax Design | ✅ Completed | Complete grammar specification |
| DSL → IR Parser | ✅ Completed | Lexical analysis + Syntax analysis |
| IR → DSL Decompiler | ✅ Completed | Complete decompilation support |
| Automatic Layout Algorithm | ✅ Completed | Dagre-based automatic layout |
| Node Data Organization | ✅ Completed | 500+ nodes, 100+ enums |
| CI Automation Testing | ✅ Completed | Parser consistency testing |

### In Progress ⏳

| Feature | Status | Description |
| :--- | :--- | :--- |
| GIA → IR Converter | ⏳ In Progress | Raw mode supported, optimizing |
| IR → GIA Converter | ⏳ In Progress | Construct Graph from IR |
| Client Node Support | ⏳ In Progress | ID and enum difference handling |
| Documentation Update | ⏳ In Progress | Adapt to refactored new interfaces |

### Planned 📋

| Feature | Description |
| :--- | :--- |
| VSCode Language Extension | Syntax highlighting and intelligent completion for `.dsl.ts` files |
| Compiler Type Inference | Automatically infer DSL expression types |
| Runtime Simulation | Locally simulate node graph logic execution |

For more plans, see [TODO.md](./TODO.en.md)

---

## Related Projects

| Project | Description |
| :--- | :--- |
| [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) | Web-based Node Editor |
| [genshin-miliastra-file-format](https://github.com/script-1024/genshin-miliastra-file-format) | Introduction to `.gil` and other file formats |
| [GIScriptEditor](https://github.com/hackermdch/GIScriptEditor) | Another DSL language design, which has implemented **non-equivalent** overwriting of DSL into GIL files and provides a self-designed UgcUtil interface, but GIL parsing needs further improvement |

*Simulation automation tools using visual solutions are not listed for now*

---

## Contribution

Contributions, bug reports, and suggestions are welcome!

- 🐛 **Bug Reports**: [Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 💡 **Feature Suggestions**: [Submit an Issue](https://github.com/Wu-Yijun/Genshin-Impact-Miliastra-Wonderland-Code-Node-Editor-Pack/issues)
- 📧 **Contact Author**: [wuyijun21@mails.ucas.ac.cn](mailto:wuyijun21@mails.ucas.ac.cn)

## License

[MIT License](./LICENSE) © 2025-2026 Wu-Yijun
