import assert from "node:assert";

// const BasicTypes = ["Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId"] as const;
const BasicTypes = ["Int", "Flt", "Bol", "Str", "Vec", "Gid", "Ety", "Pfb", "Fct", "Cfg"] as const;
type BasicTypes = typeof BasicTypes[number];


type EnumId = number;
type NodeType = {
  /** Type = Basic Types */
  t: "b";
  /** Basic Types */
  b: BasicTypes;
} | {
  /** Type = Basic Enums */
  t: "e";
  /** Enum Id */
  e: EnumId;
} | {
  /** Type = List */
  t: "l";
  /** item = NodeType*/
  i: NodeType;
} | {
  /** Type = Struct */
  t: "s";
  /** fields = [name, NodeType][] */
  f: [string, NodeType][];
} | {
  /** Type = Dict */
  t: "d";
  /** Key = NodeType */
  k: NodeType;
  /** Value = NodeType */
  v: NodeType;
} | {
  /** Type = Reflect */
  t: "r";
  /** Reflect Name = string */
  r: string;
};

const T: NodeType = { t: "r", r: "T" };
const S: NodeType = { t: "r", r: "S" };
const Item: NodeType = { t: "r", r: "Item" };
const Key: NodeType = { t: "r", r: "Key" };
const Value: NodeType = { t: "r", r: "Value" };

type NodeId = number;

function stringify(node: NodeType): string {
  switch (node.t) {
    case "b":
      return node.b;
    case "e":
      return `E<${node.e}>`;
    case "l":
      return `L<${stringify(node.i)}>`;
    case "s":
      const f = node.f.map(([name, t]) => (`${name}:${stringify(t)}`));
      return `S<${f.join(",")}>`;
    case "d":
      return `D<${stringify(node.k)},${stringify(node.v)}>`;
    case "r":
      return `R<${node.r}>`;
  }
}
function parse(src: string): NodeType {
  let p = 0;
  const tokens = src.split(/([ ]+|\<|\,|\:|\>)/g).filter(x => x.trim().length > 0);
  // Throw Error for Invalid name
  const not_illegal_name = (str: string) => {
    assert(!BasicTypes.includes(str as BasicTypes), `System Type: "${str}"`);
    assert(/^[a-zA-Z][a-zA-Z0-9_]*$/s.test(str), `Invalid name: "${str}"`);
  }
  const parseTokens = (tokens: string[]): NodeType => {
    switch (tokens[p++]) {
      case "L":
        assert.equal(tokens[p++], "<");
        const item = parseTokens(tokens);
        assert.equal(tokens[p++], ">");
        return { t: "l", i: item };
      case "D":
        assert.equal(tokens[p++], "<");
        const key = parseTokens(tokens);
        assert.equal(tokens[p++], ",");
        const value = parseTokens(tokens);
        assert.equal(tokens[p++], ">");
        return { t: "d", k: key, v: value };
      case "R":
        assert.equal(tokens[p++], "<");
        const name = tokens[p++];
        not_illegal_name(name);
        assert.equal(tokens[p++], ">");
        return { t: "r", r: name };
      case "E":
        assert.equal(tokens[p++], "<");
        const eid = tokens[p++];
        assert.equal(parseInt(eid).toString(), eid);
        assert.equal(tokens[p++], ">");
        return { t: "e", e: parseInt(eid) };
      case "S":
        assert.equal(tokens[p++], "<");
        const fields: [string, NodeType][] = [];
        while (tokens[p - 1] === "<" || tokens[p++] === ",") {
          const field = tokens[p++];
          not_illegal_name(field);
          assert.equal(tokens[p++], ":");
          const type = parseTokens(tokens);
          fields.push([field, type]);
        }
        assert.equal(tokens[p - 1], ">");
        return { t: "s", f: fields };
      default:
        assert(BasicTypes.includes(tokens[p - 1] as BasicTypes), `Invalid Basic Type: "${tokens[p - 1]}"`);
        return { t: "b", b: tokens[p - 1] as BasicTypes };
    }
  }
  const ret = parseTokens(tokens);
  assert.equal(p, tokens.length, `Extra Tokens after end of expression('${tokens[p]}'): "${tokens.slice(p + 1).join("")}" `);
  return ret;


  // Deprecated
  function parseString(src: string, position = 0): { node: NodeType, len: number } {
    const s = src.slice(position, position + 2);
    switch (s) {
      case "L<": {
        const { node, len } = parseString(src, position + 2);
        assert(src[position + 2 + len] === ">", `Cannot find ">" After List: ${src.slice(position, position + 2 + len + 1)}!`);
        return { node: { t: "l", i: node }, len: 2 + len + 1 };
      }
      case "D<": {
        const { node, len } = parseString(src, position + 2);
        // console.log(node, len);
        assert(src[position + 2 + len] === ",", `Cannot find "," Inside Dict: ${src.slice(position, position + 2 + len + 1)}!`);
        const { node: value, len: valueLen } = parseString(src, position + 2 + len + 1);
        assert(src[position + 2 + len + valueLen + 1] === ">", `Cannot find ">" After Dict: ${src.slice(position, position + 2 + len + valueLen + 1)}!`);
        return { node: { t: "d", k: node, v: value }, len: 2 + len + 1 + valueLen + 1 };
      }
      case "R<": {
        const name = src.indexOf(">", position + 2);
        assert(name !== -1, `Cannot find ">" After Reflect: ${src.slice(position, position + 10)}!`);
        return { node: { t: "r", r: src.slice(position + 2, name) }, len: name + 1 - position };
      }
      case "S<": {
        const fields: [string, NodeType][] = [];
        let pos = position + 2;
        while (pos < src.length) {
          const p = src.indexOf(":", pos);
          assert(p !== -1, `Cannot find ":" Inside Struct: ${src.slice(pos, pos + 10)}!`);
          const name = src.slice(pos, p);
          const { node, len } = parseString(src, p + 1);
          fields.push([name, node]);
          pos = p + 1 + len;
          if (src[pos] === ">") break;
          assert(src[pos] === ",", `Cannot find "," Inside Struct: ${src.slice(p, pos)}!`);
          pos++;
        }
        assert(src[pos] === ">", `"Cannot find ">" After Struct ${src.slice(position, pos)}!`);
        return { node: { t: "s", f: fields }, len: pos + 1 - position };
      }
      default: {
        let pos = position;
        while (pos < src.length && src[pos] !== ">" && src[pos] !== "," && src[pos] !== ":") pos++;
        const name = src.slice(position, pos) as BasicTypes;
        assert(BasicTypes.includes(name), `"${name}" is not a Basic Type!`);
        return { node: { t: "b", b: name }, len: pos - position }
      }
    }
  }
}

type NodeReflectRecords = [index: number, reflect: string, node_id: NodeId];
interface NodePinsRecords {
  inputs: NodeType[];
  outputs: NodeType[];
  id: NodeId;
  /** Determines whether it is a basic node, 
   * or a generic node with extensive ids.
   *  
   * A map of NodeType[Struct]->NodeId */
  reflectMap?: NodeReflectRecords[];
}

interface NodePins {
  inputs: NodeType[];
  outputs: NodeType[];
  id: NodeId;
}

export function reflect(type: NodeType, ref: [string, NodeType]): NodeType {
  switch (type.t) {
    case "r":
      return type.r === ref[0] ? structuredClone(ref[1]) : type;
    case "b":
      return type;
    case "e":
      return type;
    case "l":
      return { t: "l", i: reflect(type.i, ref) };
    case "d":
      return { t: "d", k: reflect(type.k, ref), v: reflect(type.v, ref) };
    case "s":
      return { t: "s", f: type.f.map(([name, node]) => [name, reflect(node, ref)]) };
  }
}
export function reflects(type: NodeType, refs: [string, NodeType][]): NodeType {
  return refs.reduce((type, ref) => reflect(type, ref), type);
}
export function reflects_records(rec: NodePinsRecords, refs?: [string, NodeType][] | string): NodePins {
  // find id
  if (rec.reflectMap === undefined) {
    assert(refs === undefined);
    return { inputs: rec.inputs, outputs: rec.outputs, id: rec.id };
  }
  assert(refs !== undefined);
  const refs_str = typeof refs === "string" ? refs : stringify({ t: "s", f: refs });
  const id = rec.reflectMap!.find(r => r[1] === refs_str)?.[2];
  assert(id !== undefined);
  // reflect expression
  let refs_exp;
  if (typeof refs === "string") {
    const exp = parse(refs);
    assert(exp.t === "s");
    refs_exp = exp.f;
  } else {
    refs_exp = refs;
  }
  return {
    inputs: rec.inputs.map(node => reflects(node, refs_exp)),
    outputs: rec.outputs.map(node => reflects(node, refs_exp)),
    id: rec.id
  }
}
export function unwrap_records(rec: NodePinsRecords): NodePins[] {
  if (rec.reflectMap === undefined) {
    return [{
      inputs: rec.inputs,
      outputs: rec.outputs,
      id: rec.id
    }];
  }
  const map: [NodeType, NodeId][] = rec.reflectMap.sort(r => r[0]).map(r => [parse(r[1]), r[2]]);
  const rs = map.map(x => { const n = x[0]; assert(n.t === "s"); return n.f });
  const ids = map.map(x => x[1]);
  return rs.map((r, i) => ({
    inputs: rec.inputs.map(node => reflects(node, r)),
    outputs: rec.outputs.map(node => reflects(node, r)),
    id: ids[i]
  }));
}


function get_id(node: NodeType): number {
  switch (node.t) {
    case "b":
      switch (node.b) {
        case "Int":
          return 3;
        case "Flt":
          return 5;
        case "Bol":
          return 4;
        case "Str":
          return 6;
        case "Vec":
          return 12;
        case "Gid":
          return 2;
        case "Ety":
          return 1;
        case "Pfb":
          return 21;
        case "Fct":
          return 17;
        case "Cfg":
          return 20;
      }
      return 0;
    case "e":
      return 14;
    case "l":
      switch (node.i.t) {
        case "b":
          switch (node.i.b) {
            case "Int":
              return 8;
            case "Flt":
              return 10;
            case "Bol":
              return 9;
            case "Str":
              return 11;
            case "Vec":
              return 15;
            case "Gid":
              return 7;
            case "Ety":
              return 13;
            case "Pfb":
              return 23;
            case "Fct":
              return 24;
            case "Cfg":
              return 22;
          }
          return 0;
        case "s":
          return 26
        default:
          return 0;
      }
    case "d":
      return 27;
    case "r":
      return 0;
    case "s":
      return 25;
  }
}
function get_type(id: number): NodeType {
  switch (id) {
    case 1:
      return { t: "b", b: "Ety" };
    case 2:
      return { t: "b", b: "Gid" };
    case 3:
      return { t: "b", b: "Int" };
    case 4:
      return { t: "b", b: "Bol" };
    case 5:
      return { t: "b", b: "Flt" };
    case 6:
      return { t: "b", b: "Str" };
    case 7:
      return { t: "l", i: { t: "b", b: "Gid" } };
    case 8:
      return { t: "l", i: { t: "b", b: "Int" } };
    case 9:
      return { t: "l", i: { t: "b", b: "Bol" } };
    case 10:
      return { t: "l", i: { t: "b", b: "Flt" } };
    case 11:
      return { t: "l", i: { t: "b", b: "Str" } };
    case 12:
      return { t: "b", b: "Vec" };
    case 13:
      return { t: "l", i: { t: "b", b: "Ety" } };
    case 14:
      return { t: "e", e: 0 };
    case 15:
      return { t: "l", i: { t: "b", b: "Vec" } };
    case 17:
      return { t: "b", b: "Fct" };
    case 20:
      return { t: "b", b: "Cfg" };
    case 21:
      return { t: "b", b: "Pfb" };
    case 22:
      return { t: "l", i: { t: "b", b: "Cfg" } };
    case 23:
      return { t: "l", i: { t: "b", b: "Pfb" } };
    case 24:
      return { t: "l", i: { t: "b", b: "Fct" } };
    case 25:
      return { t: "s", f: [] };
    case 26:
      return { t: "l", i: { t: "s", f: [] } };
    case 27:
      return { t: "d", k: { t: "b", b: "Str" }, v: { t: "b", b: "Str" } };
  }
  throw new Error("Invalid ID: " + id);
}


if (import.meta.main) {
  function check_parse(str: string) {
    const node = parse(str);
    assert.equal(stringify(node), str);
    console.log(str);
    console.dir(node, { depth: null });
    console.log("Check Pass!\n\n\n");
  }
  function test_parse() {
    // Basic
    check_parse("Flt");
    check_parse("L<Int>");
    check_parse("D<Bol,Str>");
    check_parse("S<a:Gid,b:Vec,c:Flt>");
    check_parse("R<X>");

    // Nested
    check_parse("L<S<a:Gid,b:Vec,c:Flt>>");
    check_parse("D<S<a:Gid,b:Vec,c:Flt>,L<S<a:Gid,b:Vec,c:Flt>>>");
    check_parse("S<aaaa:S<a:Gid,b:Vec,c:Flt>,b:L<S<a:Gid,b:Vec,c:Flt>>>");
    check_parse("S<aaaa:S<a:Gid,b:Vec,c:R<X>>,b:L<S<a:Gid,b:Vec,c:Flt>>,c:Flt>");

    // More 
    check_parse("D<S<a:Gid,b:Vec,c:Flt>,L<S<a:S<aaaa:S<a:Gid,b:Vec,c:R<X>>,b:L<S<a:R<d>,b:Vec,c:Flt>>,c:Flt>,b:Vec,c:Flt>>>");

  }

  function test_id() {
    for (let i = 1; i <= 27; i++) {
      if ([16, 18, 19].includes(i)) continue;
      const t = get_type(i);
      const n = stringify(t);
      console.log(i, t, n);
      assert.equal(n, stringify(parse(n)));
      assert.equal(i, get_id(parse(n)));
      assert.equal(i, get_id(t));
    }
  }

  function test_ref() {
    const node_def: NodePinsRecords = {
      inputs: [{ t: "d", k: { t: "r", r: "Value" }, v: { t: "b", b: "Flt" } }],
      outputs: [{ t: "l", i: { t: "r", r: "Key" } }],
      id: 1,
      reflectMap: [
        [5, "S<Key:Int,Value:Flt>", 10],
        [2, "S<Key:Bol,Value:Str>", 5],
        [5, "S<Key:Str,Value:Ety>", 50],
      ]
    }
    // const node = reflects_records(node_def, node_def.reflectMap?.[0][1]);
    const node = unwrap_records(node_def);
    console.dir(node, { depth: null });
    console.dir(node.map(x => [x.inputs.map(get_id), x.outputs.map(get_id)]), { depth: null });
    console.dir(node.map(x => [x.inputs.map(stringify), x.outputs.map(stringify)]), { depth: null });
  }

  test_parse();

  // test_id();

  test_ref()

}