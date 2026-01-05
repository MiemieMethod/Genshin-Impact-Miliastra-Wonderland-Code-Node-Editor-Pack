# Node Data System Manual

This manual provides a comprehensive guide to the node data system used in the project. It covers the data structures defined in `types.ts` and the core utility classes in `core.ts`.

## Table of Contents
- [Overview](#overview)
- [Core Classes](#core-classes)
    - [Document](#document-class)
    - [Nodes](#nodes-class)
    - [Enums](#enums-class)
- [Data Structures (Schema)](#data-structures-schema)
    - [Document Interface](#document-interface)
    - [Node Definition (NodeDef)](#node-definition-nodedef)
    - [Pin Definition (PinDef)](#pin-definition-pindef)
    - [Enum Definitions](#enum-definitions)
- [Common Usage Examples](#common-usage-examples)

---

## Overview

The node data system is designed to provide ultra-fast, structured access to game node definitions, enum types, and system constants. It uses a lazy-loading strategy and Map-based caching to ensure $O(1)$ lookup performance for most metadata queries.

The system is centered around a single JSON document (typically `data.json`) that contains all static metadata required by the node editor.

---

## Core Classes

### Document Class
The `Document` class is the main entry point for the node data system.

- **Purpose**: Acts as a container and coordinator for `Nodes` and `Enums`.
- **Lazy Loading**: Collections are only initialized when accessed via `.Node` or `.Enum`.
- **Constructor**: Supports loading from a file path, JSON string, or existing objects.

```typescript
import { Document } from './utils/node_data';

const doc = new Document('path/to/data.json');
console.log(doc.version.gameVersion); // Access version info
```

### Nodes Class
The `Nodes` class manages node definitions, including their pins and variants.

- **Lookup**: Fast lookup by `Identifier` (e.g., `Execution.Action.Move`) or `ID`.
- **Variants**: Handles "Variant" (generic) nodes by injecting specific constraints (e.g., `T=Int32`) to produce a concrete `NodeDef`.
- **Connectivity**: Provides utility methods like `canConnect` to validate connections between pins.

```typescript
const node = doc.Node.getByIdentifier("Execution.Action.Move");
const isValid = doc.Node.canConnect("NodeA", "OutputPin", "NodeB", "InputPin");
```

### Enums Class
The `Enums` class handles enum values and their groupings.

- **Collections**: Manages `EnumDef` (individual values) and `EnumTypeDef` (collections like "EquipmentType").
- **Categories**: Supports grouping enums by functional categories.
- **Relationships**: Can check if an enum value belongs to a specific type or if two enums share a type.

```typescript
const itemCategory = doc.Enum.getEnumCategory("Item.Consumable");
const enumType = doc.Enum.getEnumTypeByIdentifier("ITEM"); // FourCC identification
```

---

## Data Structures (Schema)

### Document Interface
The root structure of the `data.json` file.

| Field | Type | Description |
| :--- | :--- | :--- |
| `Version` | `string` | Data & Schema version |
| `GameVersion` | `string` | Game engine version |
| `Types` | `TypeDef[]` | List of game type definitions |
| `Nodes` | `NodeDef[]` | Core node definitions |
| `Enums` | `EnumDef[]` | Individual enum value definitions |
| `EnumTypes` | `EnumTypeDef[]` | Enum collections (sets) |

### Node Definition (NodeDef)
Describes a single node's metadata.

- `Identifier`: Unique string ID (e.g., `Domain.Category.Action`).
- `System`: `Server` or `Client`.
- `Type`: `Fixed` (static pins) or `Variant` (generic pins).
- `FlowPins` / `DataPins`: Lists of `PinDef`.
- `Variants`: (Optional) Constraints and kernel mappings for generic nodes.

### Pin Definition (PinDef)
Describes a single connection point on a node.

- `Identifier`: Node-unique pin ID.
- `Direction`: `In` or `Out`.
- `Visibility`: `Display`, `Hidden`, or `Conditional`.
- `Type`: Type string (can be generic like `T`).

### Enum Definitions
- **EnumDef**: A single value (e.g., `Red`, `Blue`).
- **EnumTypeDef**: A logical grouping (e.g., `Colors`). Uses `Collection` (array of `EnumDef` identifiers) to link values.

---

## Common Usage Examples

### 1. Initializing and Accessing Version
```typescript
const doc = new Document(); // Loads default data.json
const { version, author } = doc.version;
```

### 2. Finding a Node and its Pins
```typescript
const moveNode = doc.Node.getByIdentifier("Control.MoveTo");
if (moveNode) {
    const inputDataPins = moveNode.DataPins.filter(p => p.Direction === "In");
    console.log(`Node has ${inputDataPins.length} input data pins.`);
}
```

### 3. Resolving a Variant Node
Variant nodes require specific constraints to "concretize" their pins.
```typescript
// For a generic node "Math.Add<T>"
const intAddNode = doc.Node.getVariant("Math.Add", "T=Int32");
// intAddNode now has pins specifically typed as Int32
```

### 4. Working with Enum Categories
```typescript
const categories = doc.Enum.getEnumCategories();
const weaponEnums = doc.Enum.getEnumsByCategory("Weapon");
```

### 5. Validating Connections
```typescript
const canLink = doc.Node.canConnect(
    "SourceNodeID", "OutputPin",
    "TargetNodeID", "InputPin"
);
```
