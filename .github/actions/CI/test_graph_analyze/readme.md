# 图分析算法测试 (`test_graph_analyze`)

随机生成图结构，测试 `analyzeGraph` 函数的正确性。

## 测试内容

代码见 [test.ts](./test.ts)

**验证功能:**
- 链识别 (chain detection)
- 纯环识别 (pure cycle detection)
- 孤立点识别 (isolated node detection)
- 入度/出度计算

## 测试逻辑

```
随机生成节点和边 ──► analyzeGraph() ──► 验证结果
```

**验证规则:**
1. 链中内部点: 入度 = 1, 出度 = 1
2. 链起点: 入度 ≠ 1 或 出度 ≠ 1 (特殊纯环除外)
3. 边数守恒: `Σ(chain.length - 1) + Σ(非null target)` = 输入边数

## 参数

| 参数 | 值 | 说明 |
| :--- | :--- | :--- |
| `iter` | 2000 | 测试迭代次数 |
| `max_count` | 100 | 最大节点数 |

每次迭代:
- 随机节点数: 1 ~ 100
- 随机边数: 0 ~ N(N-1)/2
- 随机节点 ID 范围

## 特殊情况处理

- **纯环**: starter = target 且入度出度均为 1
- **终点 (sink)**: 出度 = 0 的节点
- **汇入点**: 入度 > 1 的节点
