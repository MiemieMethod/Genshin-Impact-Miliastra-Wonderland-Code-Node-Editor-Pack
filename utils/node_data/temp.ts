
/**
 * 将 NodeType 映射为底层 VarType（整型枚举值）。
 *
 * 主要作用：
 * - 用于把逻辑类型系统（b/e/l/s/d/r）映射到 protobuf 层的 VarType。
 * - 若类型结构无法直接映射（如 Struct、Dict、Reflect），抛错。
 *
 * @param node 逻辑类型描述 NodeType
 * @returns 底层序列化使用的 VarType 整数 ID
 */
export function get_id(node: NodeType): number {
  switch (node.t) {
    case "b":
      switch (node.b) {
        case "Int":
          return VarType.Integer;
        case "Flt":
          return VarType.Float;
        case "Bol":
          return VarType.Boolean;
        case "Str":
          return VarType.String;
        case "Vec":
          return VarType.Vector;
        case "Gid":
          return VarType.GUID;
        case "Ety":
          return VarType.Entity;
        case "Pfb":
          return VarType.Prefab;
        case "Fct":
          return VarType.Faction;
        case "Cfg":
          return VarType.Configuration;
        case "Unk" as any:
          return VarType.UnknownVar;
      }
      break;
    case "e":
      switch (node.e) {
        case ENUM_ID.LocalVariable:  // Local Variable
          return VarType.LocalVariable;
        case ENUM_ID.VariableSnapshot:  // Variable Snapshot
          return VarType.VariableSnapshot;
      }
      return VarType.EnumItem;
    case "l":
      switch (node.i.t) {
        case "b":
          switch (node.i.b) {
            case "Int":
              return VarType.IntegerList;
            case "Flt":
              return VarType.FloatList;
            case "Bol":
              return VarType.BooleanList;
            case "Str":
              return VarType.StringList;
            case "Vec":
              return VarType.VectorList;
            case "Gid":
              return VarType.GUIDList;
            case "Ety":
              return VarType.EntityList;
            case "Pfb":
              return VarType.PrefabList;
            case "Fct":
              return VarType.FactionList;
            case "Cfg":
              return VarType.ConfigurationList;
          }
          break;
        case "s":
          return VarType.StructList;
        default:
          break;
      }
      break;
    case "d":
      return VarType.Dictionary;
    case "r":
      break;
    case "s":
      return VarType.Struct;
  }
  panic(stringify(node) + "is not a basic type! Fallback to id = 0 !");
  return 0;
}
/**
 * 获取运行时用于“类型系统判断”的类型标签。
 *
 * 不同于 get_id（其返回 protobuf 的 VarType），
 * get_type 返回可用于 DSL / 运行时系统的内部标签字符串。
 *
 * 例：
 *   b:Int   -> "Int"
 *   e:Enum  -> "Enum"
 *   l:Int   -> "List"
 *   s:{...} -> "Struct"
 *   r:R<T>  -> "Reflect"
 *
 * 用于运行时调试、序列化、人类可读展示。
 *
 * @param node NodeType
 */
export function get_type(id: number): NodeType {
  switch (id) {
    case VarType.UnknownVar:
      return UNK_TYPE;
    case VarType.Entity:
      return { t: "b", b: "Ety" };
    case VarType.GUID:
      return { t: "b", b: "Gid" };
    case VarType.Integer:
      return { t: "b", b: "Int" };
    case VarType.Boolean:
      return { t: "b", b: "Bol" };
    case VarType.Float:
      return { t: "b", b: "Flt" };
    case VarType.String:
      return { t: "b", b: "Str" };
    case VarType.GUIDList:
      return { t: "l", i: { t: "b", b: "Gid" } };
    case VarType.IntegerList:
      return { t: "l", i: { t: "b", b: "Int" } };
    case VarType.BooleanList:
      return { t: "l", i: { t: "b", b: "Bol" } };
    case VarType.FloatList:
      return { t: "l", i: { t: "b", b: "Flt" } };
    case VarType.StringList:
      return { t: "l", i: { t: "b", b: "Str" } };
    case VarType.Vector:
      return { t: "b", b: "Vec" };
    case VarType.EntityList:
      return { t: "l", i: { t: "b", b: "Ety" } };
    case VarType.EnumItem:
      return { t: "e", e: 0 };
    case VarType.VectorList:
      return { t: "l", i: { t: "b", b: "Vec" } };
    case VarType.Faction:
      return { t: "b", b: "Fct" };
    case VarType.Configuration:
      return { t: "b", b: "Cfg" };
    case VarType.Prefab:
      return { t: "b", b: "Pfb" };
    case VarType.ConfigurationList:
      return { t: "l", i: { t: "b", b: "Cfg" } };
    case VarType.PrefabList:
      return { t: "l", i: { t: "b", b: "Pfb" } };
    case VarType.FactionList:
      return { t: "l", i: { t: "b", b: "Fct" } };
    case VarType.Struct:
      return { t: "s", f: [] };
    case VarType.StringList:
      return { t: "l", i: { t: "s", f: [] } };
    case VarType.Dictionary:
      return { t: "d", k: { t: "b", b: "Ety" }, v: { t: "b", b: "Ety" } };
    case VarType.LocalVariable:
      return { t: "e", e: ENUM_ID.LocalVariable };
    case VarType.VariableSnapshot:
      return { t: "e", e: ENUM_ID.VariableSnapshot };
  }
  return panic(id + " is not a known type!");
}

export function get_id_client(node: NodeType): number {
  switch (node.t) {
    case "b":
      switch (node.b) {
        case "Int":
          return ClientVarType.Integer_;
        case "Flt":
          return ClientVarType.Float_;
        case "Bol":
          return ClientVarType.Boolean_;
        case "Str":
          return ClientVarType.String_;
        case "Vec":
          return ClientVarType.Vector_;
        case "Gid":
          return ClientVarType.GUID_;
        case "Ety":
          return ClientVarType.Entity_;
        case "Pfb":
          return ClientVarType.Prefab_;
        case "Fct":
          return ClientVarType.Faction_;
        case "Cfg":
          return ClientVarType.Configuration_;
        case "Unk" as any:
          return ClientVarType.UnknownVar_;
      }
      break;
    case "e":
      switch (node.e) {
        case -1:  // Enum type
          return ClientVarType.EnumItem_;
        case ENUM_ID.LocalVariable:  // Local Variable
          return ClientVarType.LocalVariable_;
      }
      return ClientVarType.EnumItem_;
    case "l":
      switch (node.i.t) {
        case "b":
          switch (node.i.b) {
            case "Int":
              return ClientVarType.IntegerList_;
            case "Flt":
              return ClientVarType.FloatList_;
            case "Bol":
              return ClientVarType.BooleanList_;
            case "Str":
              return ClientVarType.StringList_;
            case "Vec":
              return ClientVarType.VectorList_;
            case "Gid":
              return ClientVarType.GUIDList_;
            case "Ety":
              return ClientVarType.EntityList_;
            case "Pfb":
              return ClientVarType.PrefabList_;
            case "Cfg":
              return ClientVarType.ConfigurationList_;
          }
          break;
        case "e":
          return ClientVarType.EnumList_;
        default:
          break;
      }
      break;
    case "d":
      // 客户端没有 Dictionary 类型，使用错误处理
      break;
    case "r":
      break;
    case "s":
      // 客户端没有 Struct 类型，使用错误处理
      break;
  }

  // 不包含类型的走最后的报错逻辑
  panic(stringify(node) + " is not a supported client type!");
  return ClientVarType.UnknownVar_;
}

export function get_type_client(id: number): NodeType {
  switch (id) {
    case ClientVarType.UnknownVar_:
      return UNK_TYPE;
    case ClientVarType.Entity_:
      return { t: "b", b: "Ety" };
    case ClientVarType.EntityList_:
      return { t: "l", i: { t: "b", b: "Ety" } };
    case ClientVarType.Integer_:
      return { t: "b", b: "Int" };
    case ClientVarType.IntegerList_:
      return { t: "l", i: { t: "b", b: "Int" } };
    case ClientVarType.Boolean_:
      return { t: "b", b: "Bol" };
    case ClientVarType.BooleanList_:
      return { t: "l", i: { t: "b", b: "Bol" } };
    case ClientVarType.Float_:
      return { t: "b", b: "Flt" };
    case ClientVarType.FloatList_:
      return { t: "l", i: { t: "b", b: "Flt" } };
    case ClientVarType.String_:
      return { t: "b", b: "Str" };
    case ClientVarType.StringList_:
      return { t: "l", i: { t: "b", b: "Str" } };
    case ClientVarType.Vector_:
      return { t: "b", b: "Vec" };
    case ClientVarType.VectorList_:
      return { t: "l", i: { t: "b", b: "Vec" } };
    case ClientVarType.EnumItem_:
      return { t: "e", e: -1 };
    case ClientVarType.GUID_:
      return { t: "b", b: "Gid" };
    case ClientVarType.GUIDList_:
      return { t: "l", i: { t: "b", b: "Gid" } };
    case ClientVarType.Faction_:
      return { t: "b", b: "Fct" };
    case ClientVarType.LocalVariable_:
      return { t: "e", e: ENUM_ID.LocalVariable };
    case ClientVarType.EnumList_:
      return { t: "l", i: { t: "e", e: -1 } };
    case ClientVarType.Configuration_:
      return { t: "b", b: "Cfg" };
    case ClientVarType.Prefab_:
      return { t: "b", b: "Pfb" };
    case ClientVarType.ConfigurationList_:
      return { t: "l", i: { t: "b", b: "Cfg" } };
    case ClientVarType.PrefabList_:
      return { t: "l", i: { t: "b", b: "Pfb" } };
  }
  // 对于不支持的 ID，返回 undefined 或抛出错误
  return panic(id + " is not a known client type!");
}

export function to_node_pin(rec: NodePinsRecords): NodePins {
  return {
    inputs: rec.inputs.map(parse),
    outputs: rec.outputs.map(parse),
    id: rec.id,
  };
}


/**
 * 对 NodePinsRecords 执行 reflect 替换并返回展开后的 NodePins。
 * 若记录无 reflectMap，则直接 parse 基础类型。
 * 若有 reflectMap，则根据 refs 选择正确的特化 number。
 */
export function reflects_records(
  rec: NodePinsRecords,
  refs?: [string, NodeType][] | string | number,
  allow_undefined = false,
): NodePins {
  // find id
  if (rec.reflectMap === undefined) {
    assert(refs === undefined);
    return to_node_pin(rec);
  }
  assert(refs !== undefined);

  // reflect expression
  let refs_exp;
  if (typeof refs === "string") {
    const exp = parse(refs);
    assert(exp.t === "s");
    refs_exp = exp.f;
  } else if (typeof refs === "number") {
    const ref_str = rec.reflectMap!.find(r => r[0] === refs)?.[1];
    if (ref_str === undefined) {
      assert(allow_undefined);
      return to_node_pin(rec);
    }
    const e = parse(ref_str);
    assert(e.t === "s");
    refs_exp = e.f;
  } else {
    refs_exp = refs;
  }

  let id;
  if (typeof refs === "number") {
    id = refs;
  } else {
    const refs_str = typeof refs === "string"
      ? refs
      : stringify({ t: "s", f: refs });
    const id = rec.reflectMap!.find((r) => r[1] === refs_str)?.[0];
    assert(id !== undefined || allow_undefined);
  }

  return {
    inputs: rec.inputs.map((node) =>
      reflects(parse(node), refs_exp, allow_undefined)
    ),
    outputs: rec.outputs.map((node) =>
      reflects(parse(node), refs_exp, allow_undefined)
    ),
    id: id ?? rec.id,
  };
}
/**
 * 将包含 reflectMap 的 NodePinsRecords 全部展开，
 * 返回所有实例化后的 NodePins（每个 reflect 对应一个条目）。
 */
export function unwrap_records(rec: NodePinsRecords): NodePins[] {
  if (rec.reflectMap === undefined) {
    return [{
      inputs: rec.inputs.map(parse),
      outputs: rec.outputs.map(parse),
      id: rec.id,
    }];
  }

  const rs = rec.reflectMap.map((x) => {
    const n = parse(x[1]);
    assert(n.t === "s");
    return n.f;
  });
  const ids = rec.reflectMap.map((x) => x[0]);
  return rs.map((r, i) => ({
    inputs: rec.inputs.map((node) => reflects(parse(node), r)),
    outputs: rec.outputs.map((node) => reflects(parse(node), r)),
    id: ids[i],
  }));
}

export function find_record_index(rec: NodePinsRecords, id: number): number {
  return rec.reflectMap?.findIndex(x => x[0] === id) ?? -1;
}
