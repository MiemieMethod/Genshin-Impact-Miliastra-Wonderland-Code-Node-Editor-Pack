
# 节点数据系统 (`node_data`)

节点数据系统是整个项目的**静态数据核心**，提供所有节点、类型、枚举的完整定义。经过彻底重构，所有数据已集中到 `data.json` 中，并提供了完善的类型系统和便捷的访问接口。

## ✨ 特性

- 📊 **集中式数据**：所有节点定义集中在 `data.json`，易于维护和分发
- 🎯 **类型安全**：完整的 TypeScript 类型定义，智能代码提示
- 🔍 **高效查询**：基于 Map 的 O(1) 查询性能
- 🧬 **可变类型支持**：完整支持 Variant 节点的类型约束系统
- 🌐 **多语言**：支持 14 种语言的本地化
- 📝 **详细文档**：自动生成的节点文档，包含完整的引脚信息

---

## 📦 文件结构

| 文件 | 说明 | 大小 |
|:-----|:-----|:-----|
| **核心数据** |||
| `data.json` | 完整节点数据（JSON 格式） | ~3.8MB |
| [types.ts](./types.ts) | 数据结构类型定义 | - |
| [node_type.ts](./node_type.ts) | 类型系统核心（类型解析/转换） | - |
| **生成的便捷接口** |||
| [game_nodes.ts](./game_nodes.ts) | 节点常量（带完整文档注释） | ~700KB |
| [game_nodes.zh.ts](./game_nodes.zh.ts) | 节点常量（带完整文档注释）（中文） | ~700KB |
| **访问接口** |||
| [core.ts](./core.ts) | 类型转换和查询辅助函数 | ~25KB |
| [instances.ts](./instances.ts) | 数据访问类（Doc, NodeLib, ServerType, ClientType） | - |
| **工具** |||
| [gen_game_nodes.ts](./gen_game_nodes.ts) | 文档-便捷接口生成器（开发时使用，发布版不包含） | - |
| [UGC-Guide-Markdown](./UGC-Guide-Markdown/readme.md) | 经过简单处理的官方 UGC 指导文档与提取结果 | ~1.2MB |

---

## 🚀 快速开始

### 1. 使用节点常量

最简单的方式是使用自动生成的 `NODES` 常量：

```typescript
import { NODES } from "./utils/node_data/game_nodes.ts";

// 直接使用节点标识符
const branchNode = NODES.Control_General_Branch;
// 结果："Control.General.Branch"

// 可变类型节点
const equalNode = NODES.Arithmetic_General_Equal;
// 结果："Arithmetic.General.Equal"
```

### 2. 查询节点定义

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";

// 通过标识符查询
const nodeDef = NodeLib.getByIdentifier("Control.General.Branch");

// 通过 ID 查询
const nodeDef2 = NodeLib.getByID(2);

// 查询可变类型节点的具体变体
const intEqual = NodeLib.getVariant(
  "Arithmetic.General.Equal",
  "C<T:Int>"
);
```

### 3. 使用类型系统

```typescript
import { parse, stringify, reflect } from "./utils/node_data/node_type.ts";

// 解析类型字符串
const listType = parse("L<Int>");
// 结果：{ t: "l", i: { t: "b", b: "Int" } }

// 转换为字符串
stringify(listType);
// 结果："L<Int>"

// 反射替换（用于可变类型）
const result = reflect("R<T>", "T", "Int");
// 结果：{ t: "b", b: "Int" }
```

---

## 📚 核心概念

### 数据结构（[types.ts](./types.ts)）

#### Document - 根容器

包含所有节点数据的根对象：

```typescript
interface Document {
  Version: string;              // 数据版本
  GameVersion: string;          // 游戏版本
  Types: TypeDef[];             // 类型定义
  Nodes: NodeDef[];             // 节点定义
  Enums: EnumDef[];             // 枚举值
  EnumTypes: EnumTypeDef[];     // 枚举类型
  SystemConstants: SystemConstDef; // 系统常量
}
```

#### NodeDef - 节点定义

定义单个节点的完整信息：

```typescript
interface NodeDef {
  Identifier: string;           // 如 "Control.General.Branch"
  ID: number;                   // 节点 ID
  System: "Server" | "Client";  // 适用范围
  Domain: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | ...;
  Type: "Fixed" | "Variant";    // 固定类型 或 可变类型
  FlowPins: PinDef[];           // 控制流引脚
  DataPins: PinDef[];           // 数据引脚
  Variants?: VariantDef[];      // 可变类型的变体列表
}
```

#### PinDef - 引脚定义

定义节点的单个引脚：

```typescript
interface PinDef {
  Identifier: string;           // 引脚标识符
  Direction: "In" | "Out";      // 方向
  Type?: string;                // 类型（如 "Int", "R<T>"）
  Visibility?: "Display" | "Hidden" | "Conditional";
  Label: Translations;          // 显示名称（多语言）
  Description: Translations;    // 描述（多语言）
}
```

### 类型系统（[node_type.ts](./node_type.ts)）

类型系统提供了一套完整的类型表示和操作方法。

#### 类型表示

所有类型都使用 [NodeType](../node_data/node_type.ts) 表示：

| 类型 | 字符串表示 | 对象表示 |
|:-----|:----------|:---------|
| 基础类型 | `Int`, [Str](../node_data/node_type.ts), `Bool` | `{ t: "b", b: "Int" }` |
| 枚举类型 | `E<ABCD>` | `{ t: "e", e: "ABCD" }` |
| 列表类型 | `L<Int>` | `{ t: "l", i: { t: "b", b: "Int" } }` |
| 字典类型 | `D<Int,Str>` | `{ t: "d", k: ..., v: ... }` |
| 结构体类型 | `S<x:Int,y:Flt>` | `{ t: "s", f: [["x", ...], ["y", ...]] }` |
| 反射类型 | `R<T>` | `{ t: "r", r: "T" }` |
| 约束类型 | `C<T:Int>` | `{ t: "c", c: [["T", ...]] }` |

#### 核心函数

```typescript
// 字符串 ↔ 对象转换
parse("L<Int>")      // 解析为对象
stringify(typeObj)   // 转换为字符串

// 反射操作（用于可变类型）
reflect("R<T>", "T", "Int")           // 单次替换
reflects("S<a:R<T>,b:R<K>>", "C<T:Int,K:Str>") // 多次替换

// 类型检查
is_reflect(type)                      // 是否包含反射类型
type_equal(type1, type2)              // 类型是否相等

// 反射分析
extract_reflect_names(type)           // 提取反射参数名
extract_reflect_fields(concrete, ref) // 提取反射字段映射
```

---

## 🎯 使用示例

### 示例 1：查询节点信息

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// 获取节点定义
const branchDef = NodeLib.getByIdentifier(NODES.Control_General_Branch);

console.log(branchDef.InGameName.en);  // "Double Branch"
console.log(branchDef.DataPins.length); // 数据引脚数量
console.log(branchDef.FlowPins.length); // 控制流引脚数量

// 遍历引脚
branchDef.DataPins.forEach(pin => {
  console.log(`${pin.Identifier}: ${pin.Type}`);
});
```

### 示例 2：处理可变类型节点

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// 获取泛型节点
const equalDef = NodeLib.getByIdentifier(NODES.Arithmetic_General_Equal);

console.log(equalDef.Type);  // "Variant"
console.log(equalDef.Variants.length); // 可用变体数量

// 获取具体类型的变体
const intEqualDef = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);

// 现在引脚类型已经具体化
console.log(intEqualDef.DataPins[0].Type); // "Int" (而不是 "R<T>")
```

### 示例 3：类型转换和操作

```typescript
import { parse, stringify, reflects } from "./utils/node_data/node_type.ts";

// 解析复杂类型
const dictType = parse("D<Int,L<Str>>");
console.log(dictType);
// { t: "d", k: { t: "b", b: "Int" }, v: { t: "l", i: { t: "b", b: "Str" } } }

// 处理可变类型
const genericType = parse("S<a:R<T>,b:R<K>>");
const concreteType = reflects(genericType, "C<T:Int,K:Str>");
console.log(stringify(concreteType));
// "S<a:Int,b:Str>"
```

### 示例 4：查询类型定义

```typescript
import { Doc, ServerType, ClientType } from "./utils/node_data/instances.ts";

// 获取类型定义
const intType = Doc.types.get("Primitive.Integer");
console.log(intType.DSLName);      // "Int"
console.log(intType.ID);           // 服务端类型 ID
console.log(intType.ClientID);     // 客户端类型 ID

// 类型 ID 转换
const typeId = ServerType.get_type_id({ t: "b", b: "Int" });
const nodeType = ServerType.toNodeType(typeId);
```

### 示例 5：查询枚举

```typescript
import { Doc } from "./utils/node_data/instances.ts";

// 获取枚举类型
const enumType = Doc.enumTypes.get("ABCD");
console.log(enumType.InGameName.en);
console.log(enumType.Collection); // 包含的枚举值列表

// 获取枚举值
const enumValue = Doc.enums.get("Category.Value");
console.log(enumValue.InGameName.en);
console.log(enumValue.ID);
```

---

## 🔧 生成的便捷接口

### [game_nodes.ts](./game_nodes.ts) - 节点常量

自动生成的文件，包含所有节点的标识符常量和完整文档：

```typescript
export const NODES = {
  /**
   * **Double Branch** `(Control.General.Branch)`
   *
   * | ID | │ | System | │ | Domain | │ | Type |
   * | :-:|:-:| :----: |:-:| :----: |:-:| :--: |
   * | **2** || 🖥️ Server || 🔀 Control || 📌Fixed |
   *
   * #### 📥 Inputs
   * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
   * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
   * | - || ▶️ || - || `FlowIn` ||  |
   * | 0 || 🔹 || `Bol` || `cond` ||  |
   *
   * #### 📤 Outputs
   * | Idx | │ | Dir | │ | Type | │ | Identifier | │ | Info |
   * | :-: |:-:| :-: |:-:| :--: |:-:| :-------- |:-:| :-- |
   * | - || ⏩ || - || `True` || Yes |
   * | - || ⏩ || - || `False` || No |
   */
  Control_General_Branch: "Control.General.Branch",
  
  // ... 更多节点
};
```

**优势**：
- ✅ 智能代码提示：悬停即可查看完整节点文档
- ✅ 类型安全：避免拼写错误
- ✅ 易于使用：直接使用 `NODES.xxx`

### 生成器 [gen_game_nodes.ts](./gen_game_nodes.ts)

用于从 `data.json` 生成 [game_nodes.ts](./game_nodes.ts) 和 `game_nodes.zh.ts`：

```bash
# 运行生成器（开发时）
node gen_game_nodes.ts
```

**注意**：发布版本不包含生成器，只包含生成的文件。

---

## 📖 API 参考

### NodeLib 类

```typescript
// 查询节点
NodeLib.getByIdentifier(identifier: string): NodeDef | undefined
NodeLib.getByID(id: number): NodeDef | undefined
NodeLib.findSimilar(query: string): NodeDef[]

// 可变类型节点
NodeLib.getVariant(identifier: string, constraints: string | NodeType): TypedNodeDef | null
NodeLib.filterVariantConstraints(nodeDef: NodeDef, constraints: [string, NodeType][]): ConstraintType[]
```

### 类型转换（node_type.ts）

```typescript
// 基础转换
parse(src: string | NodeType): NodeType
stringify(node: NodeType | string, options?: StringifyOptions): string

// 反射操作
reflect(srcType: NodeType | string, name: string, type: NodeType | string): NodeType
reflects(type: NodeType | string, constraints: ConstraintType | string): NodeType

// 类型检查
is_reflect(type: NodeType | string | undefined): boolean
type_equal(a: NodeType, b: NodeType): boolean

// 反射分析
extract_reflect_names(type: NodeType): string[]
extract_reflect_fields(type: NodeType, ref: NodeType): [string, NodeType][]
```

### ServerType / ClientType 类

```typescript
// 类型 ID 转换
ServerType.get_type_id(type: NodeType): number | null
ServerType.toNodeType(id: number): NodeType

ClientType.get_type_id(type: NodeType): number | null
ClientType.toNodeType(id: number): NodeType
```

---

## 💡 最佳实践

### 1. 使用 NODES 常量

```typescript
// ✅ 推荐：使用 NODES 常量
import { NODES } from "./utils/node_data/game_nodes.ts";
const node = NODES.Control_General_Branch;

// ❌ 不推荐：手写字符串
const node = "Control.General.Branch";
```

### 2. 类型安全的类型操作

```typescript
// ✅ 推荐：使用 parse/stringify
import { parse, stringify } from "./utils/node_data/node_type.ts";
const type = parse("L<Int>");
const str = stringify(type);

// ❌ 不推荐：直接操作字符串
const type = "L<Int>";
```

### 3. 处理可变类型节点

```typescript
// ✅ 推荐：使用 getVariant
const intEqual = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);

// ✅ 也可以：使用 setConstraints（在 gia_gen 中）
const node = graph.add_node(NODES.Arithmetic_General_Equal);
node.setConstraints("C<T:Int>");
```

---

## 🔄 数据更新流程

1. **提取数据**：从游戏程序集提取原始数据
2. **处理数据**：清理、验证、结构化
3. **生成 data.json**：集中所有数据
4. **生成便捷接口**：运行 [gen_game_nodes.ts](./gen_game_nodes.ts) 生成 [game_nodes.ts](./game_nodes.ts)
5. **发布**：`data.json` 和 [game_nodes.ts](./game_nodes.ts) 包含在发布版本中

---

## 📊 数据统计

- **节点总数**：~500+ （服务端 + 客户端, 加上变体 3000+）
- **类型定义**：28 种基础类型
- **枚举类型**：100+ 种
- **支持语言**：14 种 (暂不支持)
- **数据大小**：~3MB（压缩后更小）

---

## 🔗 相关模块

- [GIA 生成器](../gia_gen/readme.md) - 使用节点数据构建节点图
- [Protobuf 工具](../protobuf/readme.md) - GIA 文件编解码
- [类型系统文档](./node_type.ts) - 类型系统详细说明
- [数据结构文档](./types.ts) - 数据结构详细说明

---

## 📝 许可

MIT License