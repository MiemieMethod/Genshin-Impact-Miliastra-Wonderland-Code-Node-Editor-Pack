# Graph 接口测试 (`gia_gen`)

使用 `Graph` 类创建官方教程示例，测试节点图的创建、连接和编码功能。

## 测试内容

代码见 [test.ts](./test.ts)

**创建的节点:**
- 触发器: `When_Tab_Is_Selected`
- 分支: `Multiple_Branches__Int`, `Double_Branch`
- 查询: `Get_Custom_Variable__Int`, `Equal__Int`
- 操作: `Create_Prefab`, `Mount_Looping_Special_Effect`
- 设置: `Set_Custom_Variable__Int`

**验证功能:**
- 节点创建和 ID 分配
- 执行流连接 (`graph.flow`)
- 数据流连接 (`graph.connect`)
- 参数设置 (`node.setVal`)
- 自动布局 (`graph.autoLayout`)
- GIA 编码 (`encode_gia_file`)

## 等效 DSL

```typescript
[OnTab()[source=src, tab_id=id]].Switch(tab_id)(
    1 = If(m.eq(source.Plant_Level, 0))
      .CreatePrefab(1077236130, q.pos(), q.rot(), Self, level=1)
      .SetVal(source.Plant_Level, 1, true),
    2 = If(m.eq(Self.Plant_Level,0))
      .CreatePrefab(1077236131, q.pos(), q.rot(), Self, level=1)
      .SetVal(source.Plant_Level, 2, true),
    3 = If(m.eq(Self.Plant_Level,0))
      .PlayEffects(10002107, target=Self, "RootNode", true, true, zoom=0.1),
  );
```

## 输出

**产物:** `dist/GeneratedGraph.gia`

## 效果对比

*参考图 (官方教程):*
![参考](./reference.png)

*生成效果:*
![生成](./generated.png)