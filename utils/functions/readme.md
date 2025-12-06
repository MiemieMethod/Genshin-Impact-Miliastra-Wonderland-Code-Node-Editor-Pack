# 函数定义与生成 (`functions`)

本目录包含用于生成和管理服务器节点算术操作（Math 及部分 Query）定义的工具和源文件。主要目的是将节点定义统一为结构化的 TypeScript 函数声明，方便通过自动化脚本生成 DSL 语言扩展。

---

## 文件说明

| 文件 | 说明 | 状态 |
| :--- | :--- | :--- |
| [`math.ts`](./math.ts) | 核心函数定义列表 (`MathNodes`) | 活跃 |
| [`function_defs.ts`](./function_defs.ts) | 函数描述类型系统和解析器 | 活跃 |
| [`utils.ts`](./utils.ts) | 辅助工具和常量 | 活跃 |
| `check.ts` | 验证脚本 | 内部 |
| `tools.ts` | 参考数据提取工具 | 内部 |
| `ref.*.yaml` | 生成的参考文件 | 内部 |

---

## 核心接口

### 函数定义格式 (`Lambda`)

```typescript
interface Lambda {
  name: string[];  // [DSL名, 服务器ID, 客户端ID]
  in: Args;        // 输入参数定义
  out: Args;       // 输出参数定义
  comments?: string | string[];
}
```

### 参数类型层次

| 类型 | 说明 | 示例 |
| :--- | :--- | :--- |
| `ArgType` | 单一类型 | `"int"`, `["int", "float"]` |
| `Arg` | 命名参数 | `{ x: "int" }`, `{ val: ["int", "bool"] }` |
| `ArgArr` | 参数列表 | `[{ x: "int" }, { y: "int" }]` |
| `Overloads` | 带键重载组 | `{ i: [...], f: [...] }` |
| `Args` | 输入/输出入口 | `ArgArr | Overloads | Args[]` |

---

## 工作流程

```
tools.ts ──► ref.*.yaml ──► math.ts ──► check.ts
                              │
                              ▼
                       gen_def.ts ──► def.d.ts
```

1. **提取参考**: 运行 `tools.ts` 生成 `ref.*.yaml`
2. **编写定义**: 在 `math.ts` 中定义函数
3. **验证**: 运行 `check.ts` 确保定义完整
4. **生成**: `gen_def.ts` 生成 `def.d.ts` 供 DSL 使用

---

## 核心机制

### 键值匹配 (Key Matching)

通过 `key` 将输入与输出精确对齐，避免不需要的交叉组合。

```typescript
{
  name: ["abs", ...],
  in: {
    i: [{ x: "int" }],    // Key: i
    f: [{ x: "float" }]   // Key: f
  },
  out: {
    i: [{ out: "int" }],  // 仅与 in.i 匹配
    f: [{ out: "float" }] // 仅与 in.f 匹配
  }
}
// 生成: abs(int): int, abs(float): float
```

### 笛卡尔积扩增

默认组（无键）的输入输出会两两组合。

```typescript
{
  in: [[{ x: "int" }], [{ x: "float" }]],
  out: [[{ out: "int" }], [{ out: "float" }]]
}
// 生成 4 种: int→int, int→float, float→int, float→float
```

---

## 工具函数 (`utils.ts`)

### `expandArgs(args: Arg[])`

对参数列表进行笛卡尔积展开。

```typescript
const args = [{ x: ["int", "float"] }, { y: ["int", "float"] }];
expandArgs(args);
// [
//   [{ x: "int" }, { y: "int" }],
//   [{ x: "int" }, { y: "float" }],
//   [{ x: "float" }, { y: "int" }],
//   [{ x: "float" }, { y: "float" }]
// ]
```

### 简写助手

| 函数 | 说明 | 示例 |
| :--- | :--- | :--- |
| `X(t)`, `Y(t)`, `Z(t)` | 单参数对象 | `X("int")` → `{x: "int"}` |
| `XY(t)`, `XYZ(t)` | 参数列表 | `XY("int")` → `[{x:"int"}, {y:"int"}]` |
| `any_int`, `any_float` | 类型常量 | `["int", "Int"]`, `["float", "Float"]` |

---

## 使用示例

### 简单函数

```typescript
{
  name: ["equal", "math.equals"],
  in: any_type.map(t => [XY(t)]),
  out: [{ out: "bool" }]
}
```

### 带键重载

```typescript
{
  name: ["add", "math.add"],
  in: [
    expandArgs([{ x: any_int }, { y: any_int }]).map(args => ({ i: args })),
    expandArgs([{ x: any_float }, { y: any_float }]).map(args => ({ f: args })),
  ],
  out: {
    i: { out: "int" },
    f: { out: "float" },
  },
}
```

---

## 类型约束

允许的基本类型：
- 基础: `"int"`, `"float"`, `"bool"`, `"str"` (及大写形式)
- 复合: `"Vec"`, `"List"`, `"Dict"`, `"Struct"`
- 引用: `"Entity"`, `"GUID"`, `"Prefab"`, `"Faction"`, `"ConfigId"`

**规则：**
- 输入参数需提供大小写两种重载
- 输出通常只使用小写
- 单输出命名为 `"out"`，多输出使用可读名称

---

## 相关模块

- [类型生成器](../gen_def.ts) — 生成 `def.d.ts`
- [GIA 生成器](../gia_gen/readme.md) — 节点图构建
- [节点数据](../node_data/readme.md) — 节点 ID 和枚举