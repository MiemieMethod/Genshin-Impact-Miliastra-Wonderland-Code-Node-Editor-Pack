# 编译器和反编译器测试 (`parser`)

测试 DSL 解析 (编译) 和 IR 反编译的正确性。

## 测试内容

代码见 [test.ts](./test.ts)，测试用例见 [test.dsl.ts](./test.dsl.ts)

**验证功能:**

1. **解析**: DSL 源码 → IR 中间表示
2. **反编译**: IR → DSL 源码
3. **双重检查**: 验证往返转换一致性

## 双重检查逻辑

```
DSL ──► IR₁ ──► DSL₁ ──► IR₂ ──► DSL₂
            │           │
            └─ 比较 ────┘
```

- `IR₁ === IR₂` (忽略 `_id`, `_srcRange`)
- `DSL₁ === DSL₂`

## 测试用例

测试用例 [test.dsl.ts](./test.dsl.ts) 包含:
- 全局声明 (`declare global`)
- 节点变量 (`declare namespace node`)
- 本地变量 (`const`)
- 组件函数 (`function`)
- 执行块 (`[Trigger].Chain`)
- 分支控制 (`If`, `Switch`)
- Lambda 表达式 (`$((x) => ...)`)

## 输出

**产物:**
- `dist/IR.json` — 解析后的 IR 结构
- `dist/GeneratedDSL.dsl.ts` — 反编译生成的 DSL
