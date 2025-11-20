import { readFileSync, writeFileSync } from "fs";
import { AllTypes, AllKeyTypes, AllValTypes } from "../src/sysTypes.ts";
import type { int, str, float, bool, Int, Float, Bool, Str, Vec, GUID, Entity, Prefab, Faction, ConfigId, List, Dict, Struct } from "../src/sysTypes.ts";

// const RawTypes = ["int", "float", "bool", "str"] as const;
// const RawTypeMaps = ["bigint", "number", "boolean", "string"] as const;
// const ExtendTypes = ["Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const;
// const AllTypes = [...ExtendTypes, ...RawTypes] as const;
// const AllKeyTypes = ["Entity", "GUID", "Int", "Str", "Faction", "ConfigId", "Prefab"] as const satisfies (typeof ExtendTypes[number])[];
// const AllValTypes = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "Faction", "Vec", "ConfigId", "Prefab"] as const satisfies (typeof ExtendTypes[number])[];


const version = "1.0.0";
declare namespace MathNodes {
  function equal(x: int, y: int): boolean;
  function equal(x: str, y: str): boolean;
  function equal(x: Int, y: Int): boolean;
  function equal(x: Str, y: Str): boolean;
  function equal(x: GUID, y: GUID): boolean;
  function equal(x: Entity, y: Entity): boolean;
  function equal(x: Vec, y: Vec): boolean;
  function equal(x: Faction, y: Faction): boolean;
  function equal(x: Float, y: Float): boolean;
  function equal(x: ConfigId, y: ConfigId): boolean;
  function equal(x: Prefab, y: Prefab): boolean;
  /* <Enumerations Equal> */

  // ====== Type Convert ======
  function int(src: float | boolean): int;
  function boolean(src: float | int): int;
  function float(src: int): float;
  function string(src: int | float | boolean | vec): string;
  function string(src: Entity | GUID | FactionType): string;

  function vec(x: int, y: int, z: int): vec;
  function vec([x, y, z]: [int, int, int]): vec;
  function split_vec(v: vec): [x: int, y: int, z: int];

  function list<T>(...items: T[]): List<T>;
  function indices_of<T>(list: List<T>, item: T): List<int>;
  /** @deprecated Please use list[index] directly. */
  function list_item<T>(list: List<T>, index: int): T;
  /** @deprecated Please use list.length directly. */
  function list_len<T>(list: List<T>): int;
  /** @deprecated Please use list.includes directly. */
  function includes<T>(list: List<T>, item: T): boolean;
  function maximum(int_list: List<int>): int;
  function maximum(float_list: List<float>): float;
  function minimum(int_list: List<int>): int;
  function minimum(float_list: List<float>): float;

  function dict<K, V>(keys: List<K>, values: List<V>): Dict<K, V>;
  function dict<K, V>(...pairs: [K, V][]): Dict<K, V>;
  /** @deprecated Please use dict.has_key() directly. */
  function dict_has_key<K, V>(dict: Dict<K, V>, key: K): boolean;
  /** @deprecated Please use dict.values().includes directly. */
  function dict_has_val<K, V>(dict: Dict<K, V>, value: V): boolean;
  /** @deprecated Please use dict.get directly. */
  function dict_get(): void;
  /** @deprecated Please use dict.keys directly. */
  function dict_keys(): void;
  /** @deprecated Please use dict.values directly. */
  function dict_values(): void;

  function struct<T>(...vals: (T[keyof T])[]): T;
  function split_struct<T>(src: T): (T[keyof T])[][];

  function add(x: int, y: int): int;
  function sub(x: int, y: int): int;
  function mul(x: int, y: int): int;
  function div(x: int, y: int): int;
  function mod(x: int, y: int): int;
  function min(x: int, y: int): int;
  function max(x: int, y: int): int;
  function range(min: int, max: int, x: int): int;
  function abs(x: int): int;
  function sgn(x: int): int;
  function shiftL(x: int, offset: int): int;
  function shiftR(x: int, offset: int): int;
  function bitand(x: int, y: int): int;
  function bitor(x: int, y: int): int;
  function bitxor(x: int, y: int): int;
  function bitnot(x: int, y: int): int;
  /** write x bitly from start to end(inclusive) */
  function bit_write(target: int, start: int, end: int, x: int): int;
  /** read x bitly from start to end(inclusive) */
  function bit_read(src: int, start: int, end: int): int;

  function add(x: float, y: float): float;
  function sub(x: float, y: float): float;
  function mul(x: float, y: float): float;
  function div(x: float, y: float): float;
  function min(x: float, y: float): float;
  function max(x: float, y: float): float;
  function range(x: float, min: float, max: float): float;
  function log(x: float, base: float): float;
  function pow(base: float, x: float): float;
  function cos(x: float): float;
  function sin(x: float): float;
  function tan(x: float): float;
  function acos(x: float): float;
  function asin(x: float): float;
  function atan(x: float): float;
  function deg(rad: float): float;
  function rad(deg: float): float;
  function abs(x: float): float;
  function sqrt(x: float): float;
  function sgn(x: float): float;
  function round(x: float, mode: EnumRoundMode): int;
  function floor(x: float): int;
  function ceil(x: float): int;

  function gt(x: int, y: int): boolean;
  function ge(x: int, y: int): boolean;
  function lt(x: int, y: int): boolean;
  function le(x: int, y: int): boolean;
  function gt(x: float, y: float): boolean;
  function ge(x: float, y: float): boolean;
  function lt(x: float, y: float): boolean;
  function le(x: float, y: float): boolean;

  function not(x: boolean): boolean;
  function or(x: boolean): boolean;
  function xor(x: boolean, y: boolean): boolean;
  function and(x: boolean, y: boolean): boolean;

  // ---- vec ---- //
  function distance(v1: vec, v2: vec): float;
  function normalize(v: vec): vec;
  /** Length of vec */
  function norm(v: vec): float;
  function add(v1: vec, v2: vec): vec;
  function sub(v1: vec, v2: vec): vec;
  function scale(v: vec, x: float): vec;
  function dot(v1: vec, v2: vec): float;
  function cross(v1: vec, v2: vec): vec;
  /** rad */
  function angle(v1: vec, v2: vec): float;
  /** rot is in deg uint */
  function eula_rot(front: vec, up: vec): vec;
  /** rot is in deg uint */
  function rotate(target: vec, rot: vec): vec;

  // ---- Should in query but i put them here in math ---- //
  /** from min to max */
  function random(min: float, max: float): float;
  /** from 0 to max */
  function random(max: float): float;
  /** from 0 to 1 */
  function random(): float;
  function randomInt(min?: int, max?: int): int;
  function randomDict(list: List<int>): int;

  namespace VEC {
    function zero(): vec;
    function front(): vec;
    function back(): vec;
    function up(): vec;
    function down(): vec;
    function left(): vec;
    function right(): vec;
  }

  function PI(): float;
}


function main() {
  class Reader {
    content: string;
    constructor(file: string) {
      this.content = readFileSync(file).toString();
    }
    find_namespace(name: string): string {
      const reg = new RegExp(`namespace\\s+${name}\\s+{`, "gm");
      const match = reg.exec(this.content);
      if (!match) {
        throw new Error(`Namespace ${name} not found`);
      }
      const start = match.index + match[0].length;
      return this.balancePairs(start - 1);
    }
    balancePairs(start: number, depth: number = 0): string {
      const open = new Set(["{", "(", "["]);
      const close = new Set(["}", ")", "]"]);
      let i = start;
      while (i < this.content.length) {
        const char = this.content[i];
        if (open.has(char)) {
          depth++;
        } else if (close.has(char)) {
          depth--;
        } else if (char === '"' || char === "'") {
          // skip string
          const quote = char;
          i++;
          while (i < this.content.length && this.content[i] !== quote) {
            if (this.content[i] === "\\") {
              i += 2;
            } else {
              i++;
            }
          }
        } else if (this.content.startsWith("//", i)) {
          // skip line comment
          i += 2;
          while (i < this.content.length && this.content[i] !== "\n") {
            i++;
          }
        } else if (this.content.startsWith("/*", i)) {
          // skip block comment
          i += 2;
          while (i < this.content.length && !this.content.startsWith("*/", i)) {
            i++;
          }
          i += 1;
        }
        i++;
        if (depth === 0) {
          return this.content.slice(start, i + 1);
        }
      }
      throw new Error("Unbalanced pairs");
    }
  }

  type OpenPair = "{" | "[" | '(' | "<" | '`' | '"' | "'";
  type ClosePair = "}" | "]" | ')' | ">" | '`' | '"' | "'";
  const PAIRS: [OpenPair, ClosePair][] = [
    ["{", "}"],
    ["[", "]"],
    ['(', ')'],
    ['<', '>'],
    ['`', '`'],
    ['\'', '\''],
    ['"', '"'],
  ];
  class Generator {
    tab: string = "  ";
    stacks: string[] = [];
    content: string = "";
    constructor(version: string) {
      this.addLines(`/** Types And Functions declarations for DSL
 * This file is auto generated by utils/gen_def.ts
 * Do not edit this file directly.
 *
 * @version ${version}
 * @date ${new Date().toString()}
 * @author Aluria
 */\n`);
      this.addLine(`export { };\n`);
    }
    push(open?: OpenPair) {
      this.stacks.push(PAIRS.find(pair => pair[0] === open)?.[1] ?? "");
    }
    pop() {
      const close = this.stacks.pop();
      if (close) {
        this.addLine(close);
      }
    }
    addRaw(line: string) {
      this.content += line + "\n";
    }
    addLine(line: string = "") {
      const last = line.trimEnd().slice(-1);
      if (last === this.stacks.slice(-1)[0]) {
        this.stacks.pop();
      }
      this.content += this.tab.repeat(this.stacks.length) + line + "\n";
      if (last === "{" || last === "[" || last === "(" || last === "<") {
        this.push(last as OpenPair);
      }
    }
    addLines(lines: string, trim: boolean = false) {
      for (const line of lines.split("\n")) {
        const l = trim ? line.trim() : line;
        this.addLine(l);
      }
    }
    dump(file: string) {
      writeFileSync(file, this.content);
    }

    addType(name: string, def: string) {
      this.addLine(`type ${name} = ${def};`);
    }
    addFun(
      name: string,
      args: [name: string, type: string][],
      ret: string,
      no_func: boolean = false,
    ) {
      const argsStr = args.map(([n, t]) => `${n}: ${t}`).join(", ");
      this.addLine(`${no_func ? "" : "function "}${name}(${argsStr}): ${ret};`);
    }
    addComments(comment: string) {
      this.addLines(`/** ${comment.split("\n").join("\n * ")} */`);
    }
    addComment(comment: string) {
      this.addLines(`// ${comment.replaceAll(/\n+/g, s => s + "// ")}`);
    }
    addClass(
      name: string,
      extendsClass: string | null = null,
      body?: {
        val?: [name: string, type: string, comment?: string][],
        fun?: [
          name: string,
          args: [name: string, type: string][],
          ret: string,
          comment?: string
        ][]
      }
    ) {
      this.addLine(`class ${name}${extendsClass ? ` extends ${extendsClass}` : ""} {`);
      if (body?.val) {
        for (const [n, t, c] of body.val) {
          if (c) this.addComment(c);
          this.addLine(`${n}: ${t};`);
        }
      }
      if (body?.fun) {
        for (const [n, args, ret, c] of body.fun) {
          if (c) this.addComment(c);
          this.addFun(n, args, ret, true);
        }
      }
      this.addLine(`}\n`);
    }
    addEnumType(name: string, cases?: (string | number)[], comment?: string) {
      if (comment) this.addComments(comment);
      if (cases) {
        this.addLine(`type ${name} =`);
        this.push();
        for (const c of cases ?? []) {
          this.addLine(`| ${typeof c === "string" ? `"${c}"` : c}`);
        }
        this.addLine(`;`);
        this.pop();
      } else {
        this.addLine(`type ${name} = "TODO";`);
      }
    }
  }

  function addEnumType(gen: Generator) {
    gen.addEnumType("EnumGeneric", undefined, "Enum Equal Id = 475");
    gen.addEnumType("EnumComparisonOperators", undefined, "Enum Equal Id = 476");
    gen.addEnumType("EnumLogicalOperators", undefined, "Enum Equal Id = 477");
    gen.addEnumType("EnumMathematicalOperators", undefined, "Enum Equal Id = 478");
    gen.addEnumType("EnumAttackShapes", undefined, "Enum Equal Id = 479");
    gen.addEnumType("EnumSurvivalStatus", undefined, "Enum Equal Id = 480");
    gen.addEnumType("EnumSortingRules", undefined, "Enum Equal Id = 481");
    gen.addEnumType("EnumRoundingLogic", ["Round", "RoundUp", "RoundDown", "Truncate"], "Enum Equal Id = 482");
    gen.addEnumType("EnumTypeConversions", undefined, "Enum Equal Id = 483");
    gen.addEnumType("EnumMotionPathPointTypes", undefined, "Enum Equal Id = 484");
    gen.addEnumType("EnumMotionTypes", undefined, "Enum Equal Id = 485");
    gen.addEnumType("EnumFollowLocationType", undefined, "Enum Equal Id = 486");
    gen.addEnumType("EnumCoordinateSystemType", undefined, "Enum Equal Id = 487");
    gen.addEnumType("EnumElementalType", undefined, "Enum Equal Id = 488");
    gen.addEnumType("EnumEntityType", ["Stage", "Object", "Player", "Character", "Creation"], "Enum Equal Id = 489");
    gen.addEnumType("EnumUnitStatusAdditionResult", undefined, "Enum Equal Id = 491");
    gen.addEnumType("EnumUnitStatusRemovalReason", undefined, "Enum Equal Id = 492");
    gen.addEnumType("EnumUnitStatusRemovalStrategy", undefined, "Enum Equal Id = 493");
    gen.addEnumType("EnumRevivePointSelectionStrategy", undefined, "Enum Equal Id = 494");
    gen.addEnumType("EnumCauseOfBeingDown", ["NodeGraph", "Defeat", "Accident"], "Enum Equal Id = 495");
    gen.addEnumType("EnumTrigonometricFunctions", undefined, "Enum Equal Id = 496");
    gen.addEnumType("EnumDisruptorDeviceTypes", undefined, "Enum Equal Id = 497");
    gen.addEnumType("EnumDisruptorDeviceOrientation", undefined, "Enum Equal Id = 498");
    gen.addEnumType("EnumUIControlGroupStatus", undefined, "Enum Equal Id = 499");
    gen.addEnumType("EnumTargetType", undefined, "Enum Equal Id = 500");
    gen.addEnumType("EnumTriggerRestriction", undefined, "Enum Equal Id = 501");
    gen.addEnumType("EnumHitType", undefined, "Enum Equal Id = 502");
    gen.addEnumType("EnumAttackType", undefined, "Enum Equal Id = 503");
    gen.addEnumType("EnumHitPerformanceLevel", undefined, "Enum Equal Id = 504");
    gen.addEnumType("EnumSkillSlot", ["Attack", "E", "Q", "R", "T", "Custom"], "Enum Equal Id = 3351");
    gen.addEnumType("EnumSoundAttenuationMode", undefined, "Enum Equal Id = 3352");
    gen.addEnumType("EnumSelectCompletionReason", undefined, "Enum Equal Id = 3353");
    gen.addEnumType("EnumSettlementStatus", undefined, "Enum Equal Id = 3354");
    gen.addEnumType("EnumReasonForItemChange", undefined, "Enum Equal Id = 3356");
    gen.addEnumType("EnumItemLootType", undefined, "Enum Equal Id = 3357");
    gen.addEnumType("EnumDecisionRefreshMode", undefined, "Enum Equal Id = 3358");
    gen.addEnumType("EnumElementalReactionType", undefined, "Enum Equal Id = 3359");
    gen.addEnumType("EnumInterruptStatus", undefined, "Enum Equal Id = 759");
    gen.addEnumType("EnumGameplayMode", ["PlayTest", "RoomPlay", "MatchmakingPlay"], "Enum Equal Id = 776");
    gen.addEnumType("EnumInputDeviceType", ["Keyboard", "Gamepad", "Touchscreen"], "Enum Equal Id = 777");
  }

  const reader = new Reader(import.meta.filename);
  const gen = new Generator(version);

  gen.addClass(`TypeBase`);
  gen.addType("SysItemTypes", AllValTypes.join(" | "));
  gen.addType("SysKeyTypes", AllKeyTypes.join(" | "));
  gen.addType("SysValTypes", AllValTypes.join(" | ") + " | List");
  gen.addLine(`declare global {`);

  gen.addLine();
  gen.addComment("====== System Basic Types ======");
  gen.addType("int", "bigint");
  gen.addType("float", "number");
  gen.addType("bool", "boolean");
  gen.addType("str", "string");


  gen.addClass("Float", "TypeBase", {
    val: [["type", `"Float"`], ["val", `number`]],
    fun: [["toString", [], "str"], ["private clone", [], "Float"]]
  });
  gen.addClass("Bool", "TypeBase", {
    val: [["type", `"Bool"`], ["val", `boolean`]],
    fun: [["toString", [], "str"], ["private clone", [], "Bool"]]
  });
  gen.addClass("Str", "TypeBase", {
    val: [["type", `"Str"`], ["val", `string`]],
    fun: [["toString", [], "str"], ["private clone", [], "Str"]]
  });
  gen.addClass("Vec", "TypeBase", {
    val: [["type", `"Vec"`], ["val", `[number, number, number]`]],
    fun: [
      ["get x", [], "number"], ["get y", [], "number"], ["get z", [], "number"],
      ["get 0", [], "number"], ["get 1", [], "number"], ["get 2", [], "number"],
      ["toString", [], "str"], ["private clone", [], "Vec"],
    ]
  });
  ["Int", "GUID", "Entity", "Prefab", "Faction", "ConfigId"]
    .forEach((type) => {
      gen.addClass(type, "TypeBase", {
        val: [["type", `"${type}"`], ["val", `bigint`]],
        fun: [["toString", [], "str"], ["private clone", [], `${type}`]]
      });
    });
  gen.addClass("List", "TypeBase", {
    val: [
      ["type", `"List"`], ["val", `SysItemTypes[]`],
      ["val_type", AllValTypes.map(t => `"${t}"`).join(" | ")],
      ["[index: number]", "SysItemTypes"]
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "List"],
    ]
  });
  gen.addClass("Dict", "TypeBase", {
    val: [
      ["type", `"Dict"`], ["key", `SysKeyTypes[]`], ["val", `SysValTypes[]`],
      ["key_type", AllKeyTypes.map(t => `"${t}"`).join(" | ")],
      ["val_type", [...AllValTypes, "List"].map(t => `"${t}"`).join(" | ")],
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "Dict"],
    ]
  });
  gen.addClass("Struct", "TypeBase", {
    val: [
      ["type", `"Struct"`], ["fields", "string[]"], ["val", `SysValTypes[]`],
      ["val_type", AllTypes.map(t => `"${t}"`).join(" | ")],
    ],
    fun: [
      ["toString", [], "str"], ["private clone", [], "Struct"],
    ]
  });

  gen.addLine();
  gen.addComment("====== System Enum Types ======");
  addEnumType(gen);

  gen.addLine();
  gen.addComment("====== System Extended Types ======");
  gen.addClass("EntityVarSnapshot", undefined, {
    val: [["type", `"EntityVarSnapshot"`]]
  });


  gen.addLine();
  gen.addComment("====== System Extended Types ======");
  gen.addLines("namespace m " + reader.find_namespace("MathNodes"), true);

  gen.pop();

  gen.dump(import.meta.dirname + "/../src/test/def.d.ts");
}


main();

export { };