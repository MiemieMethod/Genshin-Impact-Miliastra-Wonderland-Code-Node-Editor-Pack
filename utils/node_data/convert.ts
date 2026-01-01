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
// TODO: get Enum Real Id

import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";

// const g = decode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/1.gia");

// const inputs = g.graph.compositeDef?.inner.def?.inputs!;

// const nodes = g.accessories[0].graph?.inner.graph.nodes!;
// const node = nodes[0];
// nodes.length = 0;

// const match = data.Nodes.find(x => x.Identifier === "Arithmetic.General.Enum_Equal")!;
// match.Variants!.forEach((v, i) => {
//   const n: any = structuredClone(node);
//   n.kernelId.nodeId = v.KernelID;
//   n.pins.forEach((p: any) => {
//     p.value.bConcreteValue.indexOfConcrete = v.InjectedContents[0].TypeSelectorIndex;
//   });
//   n.nodeIndex = i + 1;
//   n.y = -200 * i;
//   nodes.push(n);
// });

// encode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia", g);


const g = decode_gia_file("c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/3.gia");
const inputs = g.graph.compositeDef?.inner.def?.inputs!;
const match = data.Nodes.find(x => x.Identifier === "Arithmetic.General.Enum_Equal")!;
match.Variants!.forEach((v, i) => {
  const VarType = inputs[i].type.type1;
  const enumId = inputs[i].type.enumType.enumId;
  console.log(v.Constraints, VarType, enumId);
  const e = data.Enums.find(x => x.System === "Server" && x.Identifier === v.Constraints.slice(6, -2));
  assert(e !== undefined);
  e.__old_id = e.ID;
  e.ID = enumId;
  e.TypeID = VarType;

});

// console.log(inputs);
// console.log(node);

save("data.json", data);