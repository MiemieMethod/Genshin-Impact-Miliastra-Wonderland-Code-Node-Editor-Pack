import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), { indent: 2, maxLength: 120 })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

// 打印未能提供的 enum
// data.Enums.filter(x => x.System === "Server" && x.TypeID === undefined).forEach(e => {
//   console.log(e.Identifier);
// })
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { exit } from "process";

save("enum_lookup.yaml", stringify(data.Enums.sort((a, b) => b.System.localeCompare(a.System) || a.ID - b.ID).map(x => {
  // assert(x.ID + 10000 === x.TypeID);
  let res = {};
  res[x.Identifier] = x.ID;
  res["name"] = x.InGameName.en;
  res["items"] = Object.fromEntries(x.Items.map(y => [y.ID, y.InGameName.en]));
  return res;
})));
exit();

// IMPORTANT 提取 ENUM id 信息的很新颖的方法: 导入composite节点时是不检查内外一致性的, 因此可以手动生成接口而不用找到内部实际对应的节点......
const g = decode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/1.gia");
const input = g.graph.compositeDef?.inner.def.inputs!;
for (let id = 0; id < 60; id++) {
  // let k = (id % 2) + 10000 * (id >> 1);
  let k = id + 200000;
  const i = structuredClone(input[0]);
  i.name = "Enum_id_" + k;
  i.type.type1 = 10000 + k;
  i.type.enumType.enumId = k;
  i.index.index = id + 1;
  i.pinIndex = 50 + id;
  input[id] = i;
}
encode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia", g)

// data.Enums.filter(x => x.System === "Client" && x.TypeID === undefined).forEach(e => {
//   // console.log(e.Identifier);
//   let p = new Set();
//   e.Items.forEach(i => {
//     const a = data.Enums.find(x => x.System === 'Server' && x.Items.find(y => y.ID === i.ID) !== undefined);
//     if (a !== undefined) {
//       p.add(a);
//     }
//   });
//   if (p.size !== 1) {
//     console.log(e.Identifier, p);
//   }
// })

// save("data.json", data);