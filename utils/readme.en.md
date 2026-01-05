# Utility Library (`utils`) - Full Documentation

This directory contains the complete toolchain for GIA node graph processing. After a thorough refactoring, it provides a one-stop solution from data definition and graph construction to file encoding and decoding.

---

## ✨ Core Features

- 🎯 **Type Safety**: A complete TypeScript type system with intelligent code hints.
- 🔄 **Bidirectional Conversion**: Supports encoding and decoding of GIA files.
- 🎨 **Programmatic Construction**: High-level API to easily create complex node graphs.
- 📊 **Centralized Data**: All node definitions are centrally managed for easy maintenance.
- 🔍 **Reverse Engineering Tools**: Complete Protobuf validation and analysis toolchain.

---

## 📦 Directory Structure

| Directory/File | Description | Status |
|:----------------|:------------|:-------|
| **Core Modules** |||
| **[`gia_gen`](./gia_gen/readme.en.md)** | Programmatic GIA node graph construction tool | ✅ Active |
| **[`node_data`](./node_data/readme.en.md)** | Static node data: definitions, types, enums | ✅ Active |
| **[`protobuf`](./protobuf/README.en.md)** | GIA Protobuf definitions and encoding/decoding tools | ✅ Active |
| **Helper Utilities** |||
| [index.ts](./index.ts) | Unified export interface | ✅ Active |
| [utils.ts](./utils.ts) | General utility functions (assertions, deep comparison, etc.) | ✅ Active |
| **Low Priority/Outdated** |||
| `functions` | DSL function definition tools (outdated) | ⚠️ Low Priority |
| [gen_def.ts](./gen_def.ts) | DSL type definition generator (outdated) | ⚠️ Low Priority |
| `extracting_nodes` | Node definition extraction script | 🔒 Internal Tool |
| `ref` | Reference files (example GIA, decompiled code) | 📚 Reference |

---

## 🚀 Quick Start

### 1. Read and Write GIA Files

```typescript
import { decode_gia_file, encode_gia_file } from "./utils/protobuf/decode.ts";

// Read GIA file
const bundle = decode_gia_file("input.gia");
console.log(bundle.primary_resource.internal_name);

// Modify and save
bundle.primary_resource.internal_name = "modified_name";
encode_gia_file("output.gia", bundle);
```

### 2. Programmatically Create Node Graphs

```typescript
import { Graph } from "./utils/gia_gen/interface.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";
import { encode_gia_file } from "./utils/protobuf/decode.ts";

// Create node graph
const graph = new Graph("ENTITY_NODE_GRAPH");

// Add nodes
const trigger = graph.add_node(NODES.Trigger_Tab_OnTabSelect);
const branch = graph.add_node(NODES.Control_General_Branch);

// Connect nodes
graph.flow(trigger, branch);
graph.connect(trigger, branch, "Output0", "cond");

// Set pin values
branch.setVal("cond", true);

// Auto-layout and save
graph.autoLayout();
encode_gia_file("hello.gia", graph.encode());
```

### 3. Query Node Data

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// Query node definition
const nodeDef = NodeLib.getByIdentifier(NODES.Control_General_Branch);

console.log(nodeDef.InGameName.en);    // "Double Branch"
console.log(nodeDef.DataPins.length);  // Number of data pins
console.log(nodeDef.FlowPins.length);  // Number of flow pins

// Iterate through pins
nodeDef.DataPins.forEach(pin => {
  console.log(`${pin.Identifier}: ${pin.Type}`);
});
```

### 4. Handle Variant Type Nodes

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// Get a variant of a specific type
const intEqual = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);

// Pin types are concretized
console.log(intEqual.DataPins[0].Type); // "Int" (instead of "R<T>")
```

---

## 📚 Core Modules Explained

### [GIA Generator (`gia_gen`)](./gia_gen/readme.en.md)

High-level API for programmatically constructing GIA node graphs, providing type-safe and easy-to-use interfaces.

**Core Files:**
- [interface.ts](./gia_gen/interface.ts) - **Core API**: Graph and Node class definitions
- [core.ts](./gia_gen/core.ts) - Lower-level encoding/decoding functions
- [auto_layout.ts](./gia_gen/auto_layout.ts) - Dagre-based automatic layout algorithm
- [example.ts](./gia_gen/example.ts) - Full usage example

**Core Classes:**
- `Graph` - Node graph manager (add nodes, connections, comments, graph variables)
- `Node` - Node instance (set pin values, type constraints, position)
- `Connection` - Connection instance (control flow/data flow)
- `Comment` - Comment instance
- `GraphVar` - Graph variable instance

**Subdirectories:**
- `display/` - Visualization-related tools (node graph rendering, debug display, etc.)

**Detailed Documentation:** [gia_gen/readme.md](./gia_gen/readme.en.md)

---

### [Node Data System (`node_data`)](./node_data/readme.en.md)

The **static data core** of the entire project, providing complete definitions for all nodes, types, and enums.

**Core Data:**
- [data.json](./node_data/data.json) - Complete node data (~3.8MB, including all node definitions)
- [[types.ts](./node_data/types.ts)](./node_data/types.ts) - Data structure type definitions (Document, NodeDef, PinDef, etc.)
- [node_type.ts](./node_data/node_type.ts) - Core of the type system (type parsing/conversion/reflection)

**Access Interfaces:**
- [core.ts](./gia_gen/core.ts) - Type conversion and query helper functions
- [instances.ts](./node_data/instances.ts) - Data access classes (Doc, NodeLib, ServerType, ClientType)

**Generated Convenient Interfaces:**
- [game_nodes.ts](./node_data/game_nodes.ts) - Node constants (with full JSDoc comments, ~700KB)
- `game_nodes.zh.ts` - Node constants (Chinese version)

**Tools:**
- [gen_game_nodes.ts](./node_data/gen_game_nodes.ts)
- Generates [game_nodes.ts](./node_data/game_nodes.ts) from [data.json](./node_data/data.json)

**Subdirectories:**
- `UGC-Guide-Markdown/` - Extraction results from official UGC guide documents (containing Markdown files with node descriptions and extracted JSON data)

**Detailed Documentation:** [node_data/readme.md](./node_data/readme.en.md)

---

### [Protobuf Toolset (`protobuf`)](./protobuf/README.en.md)

A complete Protobuf processing toolchain for GIA files, balancing efficiency for production environments with transparency for testing environments.

**Core Definitions:**
- [`gia.proto`](./protobuf/gia.proto) - **Core Protobuf definition** (GIA file structure)
- [`gia.proto.ts`](./protobuf/gia.proto.ts) - Automatically generated TypeScript type definitions

**Dual-Path Encoding/Decoding System:**

| Feature | [`decode.ts`](./protobuf/decode.ts) (Production) | [`decode-cli.ts`](./protobuf/decode-cli.ts) (Debugging) |
|:----------|:-----------------------------------------------|:------------------------------------------------------|
| **Underlying Library** | Standard `protobufjs` | Pure manual parsing |
| **Goal** | Performance, Consistency | Visibility, Error Feedback |
| **Use Case** | Automated scripts, Runtime | Reverse engineering protocol, Validating proto |

**Reverse Engineering Toolchain:**
- [`decode_raw.ts`](./protobuf/decode_raw.ts) - Raw Protobuf parser (no .proto file needed)
- [`proto2ts.ts`](./protobuf/proto2ts.ts) - Proto to TypeScript interface generator
- [`verify_proto.ts`](./protobuf/verify_proto.ts) - Structure validator (compares raw data with definition)

**Detailed Documentation:** [protobuf/README.md](./protobuf/README.en.md)

---

## 🔧 Helper Utilities

### [index.ts](./index.ts) - Unified Export Interface

Unifies the export of common modules to simplify import paths:

```typescript
// Import directly from utils
import { Graph, Node, NodeLib, NODES, decode_gia_file } from "./utils/index.ts";

// Equivalent to
import { Graph, Node } from "./utils/gia_gen/index.ts";
import { NodeLib, NODES } from "./utils/node_data/index.ts";
import { decode_gia_file } from "./utils/protobuf/decode.ts";
```

**Exported Content:**
- `gia_gen/*` - Graph, Node, Connection, Comment, etc.
- `node_data/*` - NodeLib, NODES, Doc, ServerType, ClientType, etc.
- `protobuf/decode` - decode_gia_file, encode_gia_file

---

### [utils.ts](./utils.ts) - General Utility Functions

Provides project-wide utility functions and assertions.

**Core Features:**

```typescript
import { DEBUG, STRICT, panic, assert, deepEqual } from "./utils/utils.ts";

// Global configuration
DEBUG;   // Whether to show warning output
STRICT;  // Whether to interrupt directly on errors

// Error handling
panic("message");           // Throws unrecoverable error
todo("not implemented");    // Marks unimplemented features

// Assertions
assert(condition, "msg");
assertEq(target, expect);
assertDeepEq(obj1, obj2);

// Deep comparison
const equal = deepEqual(obj1, obj2, { 
  breakpoint: true,  // Trigger debugger on failure
  max_depth: 100 
});

// Object operations
exclude_keys(obj, "key1", ["nested", "key"]);
```

---

## ⚠️ Low Priority/Outdated Modules

The following modules are no longer applicable due to data and framework refactoring, and their update priority is low:

### `functions` - DSL Function Definition Tools

Used to define Math and Query nodes in DSL, supporting overloading and generics. This module is outdated due to data structure refactoring.

**Core Files:**
- [math.ts](./functions/math.ts) - List of function definitions
- [function_defs.ts](./functions/function_defs.ts) - Parser and type system
- [utils.ts](./utils.ts) - Helper functions

### [gen_def.ts](./gen_def.ts) - DSL Type Definition Generator

Reads [functions/math.ts](./functions/math.ts) to generate `def.d.ts` files. This tool is outdated as the DSL system has been refactored.

---

## 📊 Complete Workflow

### Typical Usage Scenario

```
1. Read existing GIA file
   ↓
   decode_gia_file() (protobuf/decode.ts)
   ↓
2. Parse into Graph object
   ↓
   Graph.decode() (gia_gen/interface.ts)
   ↓
3. Modify node graph
   ↓
   graph.add_node(), node.setVal(), graph.connect()
   ↓
4. Query node definition
   ↓
   NodeLib.getByIdentifier() (node_data/instances.ts)
   ↓
5. Auto-layout
   ↓
   graph.autoLayout() (gia_gen/auto_layout.ts)
   ↓
6. Encode and save
   ↓
   graph.encode() → encode_gia_file()
```

### Create Node Graph from Scratch

```
1. Create Graph instance
   ↓
   new Graph("ENTITY_NODE_GRAPH")
   ↓
2. Add nodes using NODES constants
   ↓
   graph.add_node(NODES.xxx) (node_data/game_nodes.ts)
   ↓
3. Connect nodes
   ↓
   graph.flow() / graph.connect()
   ↓
4. Set pin values
   ↓
   node.setVal()
   ↓
5. Auto-layout and save
   ↓
   graph.autoLayout() → encode_gia_file()
```

---

## 🔗 Related Documentation

- [GIA Generator Detailed Documentation](./gia_gen/readme.en.md)
- [Node Data System Detailed Documentation](./node_data/readme.en.md)
- [Protobuf Toolset Detailed Documentation](./protobuf/README.en.md)
- [Source Code](../src/readme.en.md) - Parsers and Converters
- [Main README](../Readme.en.md) - Project Overview

---

## 💡 Best Practices

### 1. Use NODES Constants Instead of Strings

```typescript
// ✅ Recommended: Use NODES constants
import { NODES } from "./utils/node_data/game_nodes.ts";
const node = graph.add_node(NODES.Control_General_Branch);

// ❌ Not Recommended: Hardcoded strings (prone to typos)
const node = graph.add_node("Control.General.Branch");
```

### 2. Use Identifiers Instead of Indices

```typescript
// ✅ Recommended: Use pin identifiers
graph.connect(nodeA, nodeB, "result", "input");

// ⚠️ Usable but Not Recommended: Use indices
graph.connect(nodeA, nodeB, 0, 0);
```

### 3. Leverage the Type System

```typescript
// ✅ Recommended: Use type-safe API
import { parse, stringify } from "./utils/node_data/node_type.ts";
const type = parse("L<Int>");
const str = stringify(type);

// ❌ Not Recommended: Directly manipulate strings
const type = "L<Int>";
```

### 4. Use Auto-Layout

```typescript
// ✅ Recommended: Use auto-layout
graph.autoLayout();

// ⚠️ Manually set only when precise control is needed
node.setPosition(2, 3);
```

---

## 📝 License

MIT License