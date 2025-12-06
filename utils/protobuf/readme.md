# Protobuf 工具 (`protobuf`)

本目录包含处理 `.gia` 文件（基于 Protobuf）的相关工具和定义文件。

---

## 文件说明

| 文件 | 说明 | 状态 |
| :--- | :--- | :--- |
| [`gia.proto`](./gia.proto) | GIA 文件 Protobuf 结构定义 | 核心 |
| [`gia.proto.ts`](./gia.proto.ts) | 自动生成的 TypeScript 类型 | 生成 |
| [`decode.ts`](./decode.ts) | TypeScript 编解码工具（**推荐**） | 活跃 |
| [`proto2ts.ts`](./proto2ts.ts) | Proto → TypeScript 转换器 | 工具 |
| [`decode.py`](./decode.py) | Python 编解码工具 | 辅助 |
| [`decode_raw.py`](./decode_raw.py) | 原始 Protobuf 解码（调试用） | 辅助 |

---

## 核心接口

### TypeScript 编解码 (`decode.ts`)

```typescript
import { decode_gia_file, encode_gia_file } from "./decode";

// 读取 GIA 文件
const data = decode_gia_file("./path/to/file.gia");

// 写入 GIA 文件
encode_gia_file("./output.gia", data);
```

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| `decode_gia_file` | `(path: string) => Root` | 读取并解码 GIA 文件 |
| `encode_gia_file` | `(path: string, data: Root) => void` | 编码并写入 GIA 文件 |
| `unwrap_gia` | `(path: string, check?: boolean) => Uint8Array` | 提取 Protobuf 数据 |
| `wrap_gia` | `(message: Type, data: Root) => ArrayBuffer` | 包装为 GIA 格式 |

### Proto 类型转换 (`proto2ts.ts`)

将 `gia.proto` 转换为 TypeScript 类型定义文件。

```bash
node utils/protobuf/proto2ts.ts [output_path] [input_path]
```

---

## GIA 文件格式

![GIA 结构](../../static/image.png)

| 字段 | 偏移 | 值 | 说明 |
| :--- | :--- | :--- | :--- |
| 文件大小 | 0x00 | `size - 4` | 文件大小减 4 字节 |
| 版本号 | 0x04 | `0x01` | 固定值 |
| 头部标记 | 0x08 | `0x0326` | **严格校验** |
| 文件类型 | 0x0C | `0x03` | GIA = 3 |
| 内容长度 | 0x10 | `size - 24` | Protobuf 数据长度 |
| Protobuf | 0x14 | ... | 节点图数据 |
| 尾部标记 | 末尾 | `0x0679` | **严格校验** |

---

## 使用示例

### 读取并修改 GIA 文件

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

### 重新生成类型定义

修改 `gia.proto` 后需运行：

```bash
node utils/protobuf/proto2ts.ts
```

### Python 工具

**解码为文本：**
```bash
python decode.py ./test.gia -o ./test.txt
```

**编码回 GIA：**
```bash
python decode.py ./test.txt --encode -o ./test_new.gia
```

**原始解码（调试）：**
```bash
python decode_raw.py ./test.gia --tags
```

---

## 手动创建 GIA 文件

> 🟩 **推荐使用** [gia_gen](../gia_gen/readme.md) 中的 `Graph` 类快速创建。

如需手动构建，步骤如下：

### 1. 构建节点

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

### 2. 构建图结构

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

### 3. 保存文件

```typescript
encode_gia_file("./output.gia", root);
```

---

## 相关模块

- [GIA 生成器](../gia_gen/readme.md) — 高层节点图构建 API
- [节点数据](../node_data/readme.md) — 节点 ID 和类型定义
- [主 README](../readme.md) — 工具库概述
