# 静态数据对比测试 (`compare_data`)

将本项目的节点定义数据与外部参考项目进行对比，检测差异和缺失。

## 测试内容

代码见 [test.ts](./test.ts)

**对比数据源:**
- **本项目**: `utils/node_data/index.json`
- **参考项目**: [WebMiliastraNodesEditor](https://github.com/Columbina-Dev/WebMiliastraNodesEditor) 的 `nodeDefinitions.ts`

**验证内容:**
- 节点 ID 匹配
- 节点名称匹配 (英文)
- 识别差异类型

## 统计项

| 类别 | 说明 |
| :--- | :--- |
| `find` | 成功匹配的节点数 |
| `unfind` | 未匹配的节点数 |
| `ref_without_id` | 参考数据缺少 ID |
| `ref_without_name` | 参考数据缺少名称 |
| `ref_with_wrong_name_id` | 名称和 ID 不一致 |
| `missing_ref` | 本项目有但参考缺失 |
| `missing_this` | 参考有但本项目缺失 |

## 输出

**产物:** `dist/server_diff.json`
