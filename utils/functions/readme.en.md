# Function Definition and Generation (`functions`)

This directory contains tools and source files for generating and managing definitions of server node arithmetic operations (Math and some Query). The main goal is to unify node definitions into structured TypeScript function declarations, facilitating the generation of DSL language extensions via automated scripts.

---

## File Description

| File | Description | Status |
| :--- | :--- | :--- |
| [`math.ts`](./math.ts) | Core function definition list (`MathNodes`) | Active |
| [`function_defs.ts`](./function_defs.ts) | Function description type system and parser | Active |
| [`utils.ts`](./utils.ts) | Utility tools and constants | Active |
| `check.ts` | Validation script | Internal |
| `tools.ts` | Reference data extraction tool | Internal |
| `ref.*.yaml` | Generated reference files | Internal |

---

## Core Interfaces

### Function Definition Format (`Lambda`)

```typescript
interface Lambda {
  name: string[];  // [DSL name, Server ID, Client ID]
  in: Args;        // Input parameter definition
  out: Args;       // Output parameter definition
  comments?: string | string[];
}
```

### Parameter Type Hierarchy

| Type | Description | Example |
| :--- | :--- | :--- |
| `ArgType` | Single type | `"int"`, `["int", "float"]` |
| `Arg` | Named parameter | `{ x: "int" }`, `{ val: ["int", "bool"] }` |
| `ArgArr` | Parameter list | `[{ x: "int" }, { y: "int" }]` |
| `Overloads` | Keyed overload group | `{ i: [...], f: [...] }` |
| `Args` | Input/output entry point | `ArgArr | Overloads | Args[]` |

---

## Workflow

```
tools.ts ──► ref.*.yaml ──► math.ts ──► check.ts
                              │
                              ▼
                       gen_def.ts ──► def.d.ts
```

1. **Extract Reference**: Run `tools.ts` to generate `ref.*.yaml`
2. **Write Definitions**: Define functions in `math.ts`
3. **Validate**: Run `check.ts` to ensure definitions are complete
4. **Generate**: `gen_def.ts` generates `def.d.ts` for DSL use

---

## Core Mechanisms

### Key Matching

Aligns inputs and outputs precisely using `key` to avoid unwanted cross-combinations.

```typescript
{
  name: ["abs", ...],
  in: {
    i: [{ x: "int" }],    // Key: i
    f: [{ x: "float" }]   // Key: f
  },
  out: {
    i: [{ out: "int" }],  // Only matches with in.i
    f: [{ out: "float" }] // Only matches with in.f
  }
}
// Generates: abs(int): int, abs(float): float
```

### Cartesian Product Expansion

Input and output of default groups (without keys) will be combined pairwise.

```typescript
{
  in: [[{ x: "int" }], [{ x: "float" }]],
  out: [[{ out: "int" }], [{ out: "float" }]]
}
// Generates 4 combinations: int→int, int→float, float→int, float→float
```

---

## Utility Functions (`utils.ts`)

### `expandArgs(args: Arg[])`

Performs a Cartesian product expansion on the parameter list.

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

### Shorthand Helpers

| Function | Description | Example |
| :--- | :--- | :--- |
| `X(t)`, `Y(t)`, `Z(t)` | Single parameter object | `X("int")` → `{x: "int"}` |
| `XY(t)`, `XYZ(t)` | Parameter list | `XY("int")` → `[{x:"int"}, {y:"int"}]` |
| `any_int`, `any_float` | Type constants | `["int", "Int"]`, `["float", "Float"]` |

---

## Usage Examples

### Simple Function

```typescript
{
  name: ["equal", "math.equals"],
  in: any_type.map(t => [XY(t)]),
  out: [{ out: "bool" }]
}
```

### Keyed Overloads

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

## Type Constraints

Allowed primitive types:
- Basic: `"int"`, `"float"`, `"bool"`, `"str"` (and their uppercase forms)
- Composite: `"Vec"`, `"List"`, `"Dict"`, `"Struct"`
- Reference: `"Entity"`, `"GUID"`, `"Prefab"`, `"Faction"`, `"ConfigId"`

**Rules:**
- Input parameters must provide both lowercase and uppercase overloads
- Outputs typically only use lowercase
- Single outputs are named `"out"`, multiple outputs use readable names

---

## Related Modules

- [Type Generator](../gen_def.ts) — Generates `def.d.ts`
- [GIA Generator](../gia_gen/readme.md) — Node graph construction
- [Node Data](../node_data/readme.md) — Node IDs and enums