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


const list1 = data.Nodes.find(x => x.Identifier === "Arithmetic.List_Client.Assemble_List")!;

const p0 = {
  "Identifier": "Input0",
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
  "Identifier": "Input1",
  "Direction": "In",
  "Type": "R<T>",
  "Label": {
    "zh-Hans": "0",
    "en": "0"
  },
  "Placeholder": null,
  "ShellIndex": 1,
  "KernelIndex": 1,
  "Visibility": "Display",
  "Connectability": true,
  "Description": {
    "zh-Hans": "将至多10个参数拼装为一个列表",
    "en": "Assembles up to 10 parameters into a list"
  }
};
const p_last = {
  "Identifier": "list",
  "Direction": "Out",
  "Type": "L<R<T>>",
  "Label": {
    "zh-Hans": "列表"
  },
  "Placeholder": null,
  "ShellIndex": 0,
  "KernelIndex": 0,
  "Visibility": "Display",
  "Connectability": true,
  "Description": {
    "zh-Hans": "拼装成的列表",
    "en": "The assembled list"
  }
};

list1.DataPins = [p0, ...Array.from({ length: 10 }, (_, i) => {
  const p = structuredClone(pi);
  p.Identifier = "Input" + String(i + 1);
  p.Label = { "zh-Hans": String(i), "en": String(i) }
  p.ShellIndex = i + 1;
  p.KernelIndex = i + 1;
  p.Visibility = "Conditional";
  return p;
}), p_last];

list1.Variants!.forEach(v => {
  const i0 = v.InjectedContents[0];
  v.InjectedContents = [...Array.from({ length: 10 }, (_, i) => {
    const ic = structuredClone(i0);
    ic.Identifier = "Input" + String(i + 1);
    return ic;
  }), ...v.InjectedContents.slice(-1)];
})

data.Nodes.forEach(n => n.Variants?.forEach(v => v.InjectedContents = v.InjectedContents.flat()))

save("data.json", data);