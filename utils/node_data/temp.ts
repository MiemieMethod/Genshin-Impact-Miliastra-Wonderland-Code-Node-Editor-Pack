import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import type { EnumDef, EnumTypeDef } from "./types.ts";
import { assert, assertDeepEq, assertEq, assertEqs, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
import * as NT from "./node_type.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { type Document, type NodeDef } from "./types.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), { indent: 2, maxLength: 120 })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

// const nodes = (data as any as Document).Nodes.filter(x => Object.keys(x).find(x => x.startsWith("__todo")) !== undefined);
// console.log(nodes.length);

// console.log(data.Nodes.filter(n => n.DataPins.find(p => p.Identifier.startsWith('Input')) !== undefined).length);


const list = data.Nodes.find(x => x.Identifier === "Query.List_Related_Client.Get_Ray_Filters")!;

const p0 = {
  "Identifier": "len",
  "Direction": "In",
  "Type": "Int",
  "Label": null,
  "Placeholder": null,
  "ShellIndex": 0,
  "KernelIndex": 0,
  "Visibility": "Hidden",
  "Connectability": true,
  "Description": {}
};
const pi = {
  "Identifier": "enum",
  "Direction": "In",
  "Type": "E<CATX>",
  "Label": {
    "zh-Hans": "",
    "en": ""
  },
  "Placeholder": null,
  "ShellIndex": 1,
  "KernelIndex": 1,
  "Visibility": "Conditional",
  "Connectability": true,
  "Description": {}
};
const p_last = {

  "Identifier": "list",
  "Direction": "Out",
  "Type": "L<E<CATX>>",
  "Label": {
    "zh-Hans": "列表",
    "en": "list"
  },
  "Placeholder": null,
  "ShellIndex": 0,
  "KernelIndex": 0,
  "Visibility": "Display",
  "Connectability": true,
  "Description": {}
};

list.DataPins = [p0, Array.from({ length: 10 }, (_, i) => {
  const p = structuredClone(pi);
  p.Identifier += String(i);
  p.Label.en += i;
  p.Label["zh-Hans"] += i;
  p.ShellIndex = i + 1;
  p.KernelIndex = i + 1;
  p.Visibility = "Conditional";
  return p;
}), p_last].flat(2);

save("data.json", data);