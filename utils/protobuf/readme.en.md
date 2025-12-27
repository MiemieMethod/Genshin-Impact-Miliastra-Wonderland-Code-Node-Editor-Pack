# Protobuf Tools (`protobuf`)

This directory contains tools for processing `.gia` files (Protobuf-based) and their definition files.

---

## File Description

| File | Description | Status |
| :--- | :--- | :--- |
| [`gia.proto`](./gia.proto) | GIA File Protobuf Structure Definition | Core |
| [`gia.proto.ts`](./gia.proto.ts) | Auto-generated TypeScript Types | Generated |
| [`decode.ts`](./decode.ts) | TypeScript Encoding/Decoding Tool (**Recommended**) | Active |
| [`proto2ts.ts`](./proto2ts.ts) | Proto → TypeScript Converter | Tool |
| [`decode.py`](./decode.py) | Python Encoding/Decoding Tool | Auxiliary |
| [`decode_raw.py`](./decode_raw.py) | Raw Protobuf Decoding (for debugging) | Auxiliary |

---

## Core Interfaces

### TypeScript Encoding/Decoding (`decode.ts`)

```typescript
import { decode_gia_file, encode_gia_file } from "./decode";

// 读取 GIA 文件
const data = decode_gia_file("./path/to/file.gia");

// 写入 GIA 文件
encode_gia_file("./output.gia", data);
```

| Function | Signature | Description |
| :--- | :--- | :--- |
| `decode_gia_file` | `(path: string) => Root` | Reads and decodes a GIA file |
| `encode_gia_file` | `(path: string, data: Root) => void` | Encodes and writes a GIA file |
| `unwrap_gia` | `(path: string, check?: boolean) => Uint8Array` | Extracts Protobuf data |
| `wrap_gia` | `(message: Type, data: Root) => ArrayBuffer` | Wraps into GIA format |

### Proto Type Conversion (`proto2ts.ts`)

Converts `gia.proto` to a TypeScript type definition file.

```bash
node utils/protobuf/proto2ts.ts [output_path] [input_path]
```

---

## GIA File Format

![GIA 结构](../../static/image.png)

| Field | Offset | Value | Description |
| :--- | :--- | :--- | :--- |
| File Size | 0x00 | `size - 4` | File size minus 4 bytes |
| Version | 0x04 | `0x01` | Fixed value |
| Header Mark | 0x08 | `0x0326` | **Strict check** |
| File Type | 0x0C | `0x03` | GIA = 3 |
| Content Length | 0x10 | `size - 24` | Protobuf data length |
| Protobuf | 0x14 | ... | Node graph data |
| Footer Mark | End | `0x0679` | **Strict check** |

---

## Usage Examples

### Reading and Modifying GIA Files

```typescript
import { decode_gia_file, encode_gia_file } from "./decode";

// 读取
const data = decode_gia_file("./input.gia");
console.log(data.graph.graph?.inner.graph.nodes);

// 修改节点位置
data.graph.graph!.inner.graph.nodes[0].x = 100;

// 保存
encode_gia_file("./output.gia", data);
```

### Regenerating Type Definitions

After modifying `gia.proto`, run:

```bash
node utils/protobuf/proto2ts.ts
```

### Python Tools

**Decode to text:**
```bash
python decode.py ./test.gia -o ./test.txt
```

**Encode back to GIA:**
```bash
python decode.py ./test.txt --encode -o ./test_new.gia
```

**Raw decoding (debugging):**
```bash
python decode_raw.py ./test.gia --tags
```

---

## Manually Creating GIA Files

> 🟩 **Recommended to use** the `Graph` class in [gia_gen](../gia_gen/readme.md) for quick creation.

If you need to build manually, follow these steps:

### 1. Build Node

```typescript
import { type GraphNode, NodeGraph_Id_Class } from "./gia.proto";

const node: GraphNode = {
  nodeIndex: 1,
  genericId: {
    class: NodeGraph_Id_Class.UserDefined,
    nodeId: 475,
    // ...
  },
  concreteId: { /* ... */ },
  pins: [ /* ... */ ],
  x: 0,
  y: 0,
};
```

### 2. Build Graph Structure

```typescript
import { type Root } from "./gia.proto";

const root: Root = {
  graph: {
    id: { /* ... */ },
    name: "MyGraph",
    graph: {
      inner: {
        graph: {
          nodes: [node],
          // ...
        }
      }
    }
  },
  filePath: "201-1234567890-102-MyGraph",
};
```

### 3. Save File

```typescript
encode_gia_file("./output.gia", root);
```

---

## Related Modules

- [GIA Generator](../gia_gen/readme.md) — High-level node graph building API
- [Node Data](../node_data/readme.md) — Node ID and Type Definitions
- [Main README](../readme.md) — Tools Library Overview