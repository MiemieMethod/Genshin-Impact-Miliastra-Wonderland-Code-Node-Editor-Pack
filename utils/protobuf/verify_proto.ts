import { type ParsedResult } from "./decode_raw.ts";
import { TypeLayers, type VarDef } from "./proto2ts.ts";

export type ErrorType =
  | "MISSING_FIELD"
  | "EXTRA_FIELD"
  | "TYPE_MISMATCH"
  | "REPEATED_MISMATCH"
  | "INVALID_ENUM";

export interface ValidationError {
  type: ErrorType;
  path: string; // e.g. "root.field1.subfield2"
  fieldIndex: number;
  content: any; // The actual value or description of the error
  expected?: any; // The expected type or value
}

const SystemTypeMap: Record<string, string> = {
  "int32": "number",
  "int64": "bigint",
  "uint32": "number",
  "uint64": "bigint",
  "sint32": "number",
  "sint64": "bigint",
  "fixed32": "number",
  "fixed64": "bigint",
  "sfixed32": "number",
  "sfixed64": "bigint",
  "bool": "boolean",
  "string": "string",
  "bytes": "Uint8Array",
  "float": "number",
  "double": "number",
};

/**
 * Verifying parsed protobuf data against proto definitions.
 */
export function verifyProto(
  data: ParsedResult,
  layer: TypeLayers,
  path: string = "root"
): ValidationError[] {
  const errors: ValidationError[] = [];

  // 1. Check for missing required fields (not optional)
  for (const [index, varDef] of layer.vars.entries()) {
    if (!varDef.optional && !varDef.repeated) {
      if (!data[index] || data[index].length === 0) {
        errors.push({
          type: "MISSING_FIELD",
          path: `${path}.${varDef.name}`,
          fieldIndex: index,
          content: `Field ${varDef.name} (#${index}) is missing`,
        });
      }
    }
  }

  // 2. Check each field in the parsed data
  for (const fieldKey in data) {
    const fieldIndex = parseInt(fieldKey);
    const values = data[fieldIndex];
    const varDef = layer.vars.get(fieldIndex);

    // 2a. Extra field check
    if (!varDef) {
      errors.push({
        type: "EXTRA_FIELD",
        path: `${path}.field_${fieldIndex}`,
        fieldIndex: fieldIndex,
        content: `Unknown field index ${fieldIndex}`,
        expected: values,
      });
      continue;
    }

    const currentPath = `${path}.${varDef.name}`;

    // 2b. Repeated field check
    if (!varDef.repeated && values.length > 1) {
      errors.push({
        type: "REPEATED_MISMATCH",
        path: currentPath,
        fieldIndex: fieldIndex,
        content: `Field is not repeated but found ${values.length} occurrences`,
      });
    }

    // 2c. Type check for each value
    for (const value of values) {
      const typeErrors = checkType(value, varDef, layer, currentPath);
      errors.push(...typeErrors);
    }
  }

  return errors;
}

function checkType(
  value: any,
  varDef: VarDef,
  currentLayer: TypeLayers,
  path: string
): ValidationError[] {
  const errors: ValidationError[] = [];
  const fieldIndex = varDef.index;
  const typeName = varDef.class[varDef.class.length - 1];

  // System Types
  if (SystemTypeMap[typeName]) {
    const expectedType = SystemTypeMap[typeName];
    const actualType = value instanceof Uint8Array ? "Uint8Array" : typeof value;

    if (expectedType === "number" && (actualType === "number" || actualType === "bigint")) {
      // Numbers can be represented as bigints in raw decoder sometimes
      return errors;
    }

    if (expectedType === "bigint" && (actualType === "number" || actualType === "bigint")) {
      return errors;
    }

    if (actualType !== expectedType) {
      errors.push({
        type: "TYPE_MISMATCH",
        path: path,
        fieldIndex: fieldIndex,
        content: `Expected '${expectedType}', got '${actualType}'`,
        expected: value,
      });
    }
    return errors;
  }

  // Message or Enum
  // Search for the type definition
  let typeLayer: TypeLayers | undefined = undefined;

  // Navigate through the layers to find the type
  let search: TypeLayers | null = currentLayer;
  while (search) {
    let found = true;
    let current: TypeLayers = search;
    for (const p of varDef.class) {
      const next = current.message.get(p);
      if (next) {
        current = next;
      } else {
        found = false;
        break;
      }
    }
    if (found) {
      typeLayer = current;
      break;
    }
    search = search.parent;
  }

  if (!typeLayer) {
    // This shouldn't happen if searchVars() was called correctly
    errors.push({
      type: "TYPE_MISMATCH",
      path: path,
      fieldIndex: fieldIndex,
      content: `Definition for ${varDef.class.join(".")} not found`,
    });
    return errors;
  }

  // If it's an enum
  const enumValues = typeLayer.parent?.enums.get(typeLayer.name);
  if (enumValues) {
    const val = Number(value);
    const isValid = enumValues.some(([_, v]) => v === val);
    if (!isValid) {
      errors.push({
        type: "INVALID_ENUM",
        path: path,
        fieldIndex: fieldIndex,
        content: `Value ${val} is not a valid enum value for ${typeLayer.name}`,
        expected: enumValues.map(e => `${e[0]}=${e[1]}`).join(", "),
      });
    }
    return errors;
  }

  // If it's a message
  if (typeof value === "object" && value !== null && !(value instanceof Uint8Array)) {
    // Nested message
    errors.push(...verifyProto(value as ParsedResult, typeLayer, path));
  } else {
    errors.push({
      type: "TYPE_MISMATCH",
      path: path,
      fieldIndex: fieldIndex,
      content: `Expected message ${typeLayer.name}, but got ${typeof value}`,
    });
  }

  return errors;
}
