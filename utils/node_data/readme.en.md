# Node Data System (`node_data`)

The node data system is the **static data core** of the entire project, providing complete definitions for all nodes, types, and enums. After a thorough refactoring, all data has been centralized into `data.json`, offering a comprehensive type system and convenient access interfaces.

## ✨ Features

- 📊 **Centralized Data**: All node definitions are concentrated in `data.json`, easy to maintain and distribute.
- 🎯 **Type Safety**: Complete TypeScript type definitions, intelligent code completion.
- 🔍 **Efficient Query**: Map-based O(1) query performance.
- 🧬 **Variant Type Support**: Full support for the type constraint system of Variant nodes.
- 🌐 **Multilingual**: Supports localization in 14 languages.
- 📝 **Detailed Documentation**: Automatically generated node documentation, including complete pin information.

---

## 📦 File Structure

| File | Description | Size |
|:-----|:------------|:-----|
| **Core Data** |||
| `data.json` | Complete node data (JSON format) | ~3.8MB |
| [types.ts](./types.ts) | Data structure type definitions | - |
| [node_type.ts](./node_type.ts) | Type system core (type parsing/conversion) | - |
| **Generated Convenience Interfaces** |||
| [game_nodes.ts](./game_nodes.ts) | Node constants (with complete documentation comments) | ~700KB |
| [game_nodes.zh.ts](./game_nodes.zh.ts) | Node constants (with complete documentation comments) (Chinese) | ~700KB |
| **Access Interfaces** |||
| [core.ts](./core.ts) | Type conversion and query helper functions | ~25KB |
| [instances.ts](./instances.ts) | Data access classes (Doc, NodeLib, ServerType, ClientType) | - |
| **Tools** |||
| [gen_game_nodes.ts](./gen_game_nodes.ts) | Documentation-Convenience Interface Generator (used during development, not included in release) | - |
| [UGC-Guide-Markdown](./UGC-Guide-Markdown/readme.en.md) | Official UGC guide documentation and extraction results after simple processing | ~1.2MB |

---

## 🚀 Quick Start

### 1. Using Node Constants

The simplest way is to use the automatically generated `NODES` constant:

```typescript
import { NODES } from "./utils/node_data/game_nodes.ts";

// Directly use node identifier
const branchNode = NODES.Control_General_Branch;
// Result: "Control.General.Branch"

// Variant type node
const equalNode = NODES.Arithmetic_General_Equal;
// Result: "Arithmetic.General.Equal"
```

### 2. Querying Node Definitions

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";

// Query by identifier
const nodeDef = NodeLib.getByIdentifier("Control.General.Branch");

// Query by ID
const nodeDef2 = NodeLib.getByID(2);

// Query specific variant of a variant type node
const intEqual = NodeLib.getVariant(
  "Arithmetic.General.Equal",
  "C<T:Int>"
);
```

### 3. Using the Type System

```typescript
import { parse, stringify, reflect } from "./utils/node_data/node_type.ts";

// Parse type string
const listType = parse("L<Int>");
// Result: { t: "l", i: { t: "b", b: "Int" } }

// Convert to string
stringify(listType);
// Result: "L<Int>"

// Reflect replacement (for variant types)
const result = reflect("R<T>", "T", "Int");
// Result: { t: "b", b: "Int" }
```

---

## 📚 Core Concepts

### Data Structure ([types.ts](./types.ts))

#### Document - Root Container

The root object containing all node data:

```typescript
interface Document {
  Version: string;              // Data Version
  GameVersion: string;          // Game Version
  Types: TypeDef[];             // Type Definitions
  Nodes: NodeDef[];             // Node Definitions
  Enums: EnumDef[];             // Enum Values
  EnumTypes: EnumTypeDef[];     // Enum Types
  SystemConstants: SystemConstDef; // System Constants
}
```

#### NodeDef - Node Definition

Defines the complete information for a single node:

```typescript
interface NodeDef {
  Identifier: string;           // e.g., "Control.General.Branch"
  ID: number;                   // Node ID
  System: "Server" | "Client";  // Applicability
  Domain: "Execution" | "Trigger" | "Control" | "Query" | "Arithmetic" | ...;
  Type: "Fixed" | "Variant";    // Fixed Type or Variant Type
  FlowPins: PinDef[];           // Flow Pins
  DataPins: PinDef[];           // Data Pins
  Variants?: VariantDef[];      // List of variants for variant types
}
```

#### PinDef - Pin Definition

Defines a single pin of a node:

```typescript
interface PinDef {
  Identifier: string;           // Pin Identifier
  Direction: "In" | "Out";      // Direction
  Type?: string;                // Type (e.g., "Int", "R<T>")
  Visibility?: "Display" | "Hidden" | "Conditional";
  Label: Translations;          // Display Name (multilingual)
  Description: Translations;    // Description (multilingual)
}
```

### Type System ([node_type.ts](./node_type.ts))

The type system provides a complete set of methods for type representation and manipulation.

#### Type Representation

All types are represented using [NodeType](../node_data/node_type.ts):

| Type | String Representation | Object Representation |
|:-----|:--------------------|:--------------------|
| Basic Type | `Int`, [Str](../node_data/node_type.ts), `Bool` | `{ t: "b", b: "Int" }` |
| Enum Type | `E<ABCD>` | `{ t: "e", e: "ABCD" }` |
| List Type | `L<Int>` | `{ t: "l", i: { t: "b", b: "Int" } }` |
| Dictionary Type | `D<Int,Str>` | `{ t: "d", k: ..., v: ... }` |
| Struct Type | `S<x:Int,y:Flt>` | `{ t: "s", f: [["x", ...], ["y", ...]] }` |
| Reflection Type | `R<T>` | `{ t: "r", r: "T" }` |
| Constraint Type | `C<T:Int>` | `{ t: "c", c: [["T", ...]] }` |

#### Core Functions

```typescript
// String ↔ Object Conversion
parse("L<Int>")      // Parse to object
stringify(typeObj)   // Convert to string

// Reflection operations (for variant types)
reflect("R<T>", "T", "Int")           // Single replacement
reflects("S<a:R<T>,b:R<K>>", "C<T:Int,K:Str>") // Multiple replacements

// Type Checking
is_reflect(type)                      // Contains reflection type
type_equal(type1, type2)              // Types are equal

// Reflection Analysis
extract_reflect_names(type)           // Extract reflection parameter names
extract_reflect_fields(concrete, ref) // Extract reflection field mapping
```

---

## 🎯 Usage Examples

### Example 1: Querying Node Information

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// Get node definition
const branchDef = NodeLib.getByIdentifier(NODES.Control_General_Branch);

console.log(branchDef.InGameName.en);  // "Double Branch"
console.log(branchDef.DataPins.length); // Number of data pins
console.log(branchDef.FlowPins.length); // Number of flow pins

// Iterate over pins
branchDef.DataPins.forEach(pin => {
  console.log(`${pin.Identifier}: ${pin.Type}`);
});
```

### Example 2: Handling Variant Type Nodes

```typescript
import { NodeLib } from "./utils/node_data/instances.ts";
import { NODES } from "./utils/node_data/game_nodes.ts";

// Get generic node
const equalDef = NodeLib.getByIdentifier(NODES.Arithmetic_General_Equal);

console.log(equalDef.Type);  // "Variant"
console.log(equalDef.Variants.length); // Number of available variants

// Get specific type variant
const intEqualDef = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);

// Now pin types are concretized
console.log(intEqualDef.DataPins[0].Type); // "Int" (instead of "R<T>")
```

### Example 3: Type Conversion and Manipulation

```typescript
import { parse, stringify, reflects } from "./utils/node_data/node_type.ts";

// Parse complex type
const dictType = parse("D<Int,L<Str>>");
console.log(dictType);
// { t: "d", k: { t: "b", b: "Int" }, v: { t: "l", i: { t: "b", b: "Str" } } }

// Handle variant types
const genericType = parse("S<a:R<T>,b:R<K>>");
const concreteType = reflects(genericType, "C<T:Int,K:Str>");
console.log(stringify(concreteType));
// "S<a:Int,b:Str>"
```

### Example 4: Querying Type Definitions

```typescript
import { Doc, ServerType, ClientType } from "./utils/node_data/instances.ts";

// Get type definition
const intType = Doc.types.get("Primitive.Integer");
console.log(intType.DSLName);      // "Int"
console.log(intType.ID);           // Server type ID
console.log(intType.ClientID);     // Client type ID

// Type ID conversion
const typeId = ServerType.get_type_id({ t: "b", b: "Int" });
const nodeType = ServerType.toNodeType(typeId);
```

### Example 5: Querying Enums

```typescript
import { Doc } from "./utils/node_data/instances.ts";

// Get enum type
const enumType = Doc.enumTypes.get("ABCD");
console.log(enumType.InGameName.en);
console.log(enumType.Collection); // List of contained enum values

// Get enum value
const enumValue = Doc.enums.get("Category.Value");
console.log(enumValue.InGameName.en);
console.log(enumValue.ID);
```

---

## 🔧 Generated Convenience Interfaces

### [game_nodes.ts](./game_nodes.ts) - Node Constants

Automatically generated file, containing identifier constants and complete documentation for all nodes:

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
  
  // ... More nodes
};
```

**Advantages**:
- ✅ Intelligent Code Completion: Hover to view full node documentation.
- ✅ Type Safety: Avoid typos.
- ✅ Easy to Use: Directly use `NODES.xxx`.

### Generator [gen_game_nodes.ts](./gen_game_nodes.ts)

Used to generate [game_nodes.ts](./game_nodes.ts) and `game_nodes.zh.ts` from `data.json`:

```bash
# Run generator (during development)
node gen_game_nodes.ts
```

**Note**: The release version does not include the generator, only the generated files.

---

## 📖 API Reference

### NodeLib Class

```typescript
// Query nodes
NodeLib.getByIdentifier(identifier: string): NodeDef | undefined
NodeLib.getByID(id: number): NodeDef | undefined
NodeLib.findSimilar(query: string): NodeDef[]

// Variant type nodes
NodeLib.getVariant(identifier: string, constraints: string | NodeType): TypedNodeDef | null
NodeLib.filterVariantConstraints(nodeDef: NodeDef, constraints: [string, NodeType][]): ConstraintType[]
```

### Type Conversion (node_type.ts)

```typescript
// Basic Conversions
parse(src: string | NodeType): NodeType
stringify(node: NodeType | string, options?: StringifyOptions): string

// Reflection Operations
reflect(srcType: NodeType | string, name: string, type: NodeType | string): NodeType
reflects(type: NodeType | string, constraints: ConstraintType | string): NodeType

// Type Checking
is_reflect(type: NodeType | string | undefined): boolean
type_equal(a: NodeType, b: NodeType): boolean

// Reflection Analysis
extract_reflect_names(type: NodeType): string[]
extract_reflect_fields(type: NodeType, ref: NodeType): [string, NodeType][]
```

### ServerType / ClientType Class

```typescript
// Type ID Conversion
ServerType.get_type_id(type: NodeType): number | null
ServerType.toNodeType(id: number): NodeType

ClientType.get_type_id(type: NodeType): number | null
ClientType.toNodeType(id: number): NodeType
```

---

## 💡 Best Practices

### 1. Use NODES Constants

```typescript
// ✅ Recommended: Use NODES constants
import { NODES } from "./utils/node_data/game_nodes.ts";
const node = NODES.Control_General_Branch;

// ❌ Not Recommended: Hardcoding strings
const node = "Control.General.Branch";
```

### 2. Type-Safe Type Operations

```typescript
// ✅ Recommended: Use parse/stringify
import { parse, stringify } from "./utils/node_data/node_type.ts";
const type = parse("L<Int>");
const str = stringify(type);

// ❌ Not Recommended: Directly manipulating strings
const type = "L<Int>";
```

### 3. Handling Variant Type Nodes

```typescript
// ✅ Recommended: Use getVariant
const intEqual = NodeLib.getVariant(
  NODES.Arithmetic_General_Equal,
  "C<T:Int>"
);

// ✅ Also: Use setConstraints (in gia_gen)
const node = graph.add_node(NODES.Arithmetic_General_Equal);
node.setConstraints("C<T:Int>");
```

---

## 🔄 Data Update Process

1. **Extract Data**: Extract raw data from game assembly.
2. **Process Data**: Clean, validate, and structure data.
3. **Generate data.json**: Centralize all data.
4. **Generate Convenience Interfaces**: Run [gen_game_nodes.ts](./gen_game_nodes.ts) to generate [game_nodes.ts](./game_nodes.ts).
5. **Publish**: `data.json` and [game_nodes.ts](./game_nodes.ts) are included in the release version.

---

## 📊 Data Statistics

- **Total Nodes**: ~500+ (Server + Client, 3000+ with variants).
- **Type Definitions**: 28 basic types.
- **Enum Types**: 100+ types.
- **Supported Languages**: 14 (currently not supported).
- **Data Size**: ~3MB (smaller when compressed).

---

## 🔗 Related Modules

- [GIA Generator](../gia_gen/readme.en.md) - Builds node graphs using node data.
- [Protobuf Tools](../protobuf/readme.en.md) - GIA file encoding and decoding.
- [Type System Documentation](./node_type.ts) - Detailed explanation of the type system.
- [Data Structure Documentation](./types.ts) - Detailed explanation of data structures.

---

## 📝 License

MIT License