import type { NodeType } from "../../utils/gia_gen/nodes.ts";
import type { NodeVarValue } from "./types.ts";



export function defaultValue(type: NodeType): NodeVarValue {
  switch (type.t) {
    case "b":
      switch (type.b) {
        case "Int":
        case "Flt":
          return 0;
        case "Bol":
          return false;
        case "Str":
          return "";
        case "Vec":
          return [0, 0, 0];
        case "Gid":
        case "Ety":
        case "Pfb":
        case "Fct":
        case "Cfg":
          return 0;
      }
    case "e":
      return 0;
    case "l":
    case "d":
      return [];
    case "s": {
      const ret: NodeVarValue[] = [];
      for (const [k, v] of type.f) {
        ret.push([k, defaultValue(v)]);
      }
      return ret;
    }
    case "r":
      return 0;
  }
  throw new Error("Invalid type! " + JSON.stringify(type));
}

export class NodeVar {
  type: NodeType;
  value: NodeVarValue;
  constructor(type: NodeType, val?: NodeVarValue) {
    this.type = type;
    this.value = val ?? defaultValue(type);
  }
}