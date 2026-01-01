import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

import DFT_VAL from "../extracting_nodes/dist/node_pins_default_vals.json" with {type: "json"};
import { exit } from "process";

const TypeMap = {
  "string": "Str",
  "bool": "Bol",
  "int": "Int",
  "float": "Flt",
  "vector3": "Vec",
  "entity": 'Ety',
  "guid": "Gid",
  "list": /^L<.+>$/,
  "enum": /^E<[A-Z]{4}>$/,
  "any": /R<.+>|^D<.+>$/,
  "camp": "Fct",
  "configId": "Cfg",
  "componentId": "Pfb",
};

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

data.Nodes.forEach(node => {
  // 验证每一个数据的关联项都是正确的.
  data.Nodes.forEach(node => {
    node.DataPins.filter(x => x.Direction === "In").forEach((pin, i) => {
      if (pin.Identifier.startsWith("Input")) assertEq(pin.Identifier, "Input" + i);
      assertEq(pin.ShellIndex, i);
    })
    node.DataPins.filter(x => x.Direction === "Out").forEach((pin, i) => {
      if (pin.Identifier.startsWith("Output")) assertEq(pin.Identifier, "Output" + i);
      assertEq(pin.ShellIndex, i);
    });
    assertEq(node.DataPins.length, new Set(node.DataPins.map(v => v.Identifier)).size)
    // pass

    assertEq(node.Type === "Fixed", node.Variants === undefined);
    node.Variants?.forEach(v => {
      assert(v.Constraints.length > 0);
      assert(v.KernelID > 0);// 似乎有一个不是
    });
    assertEq(node.Variants?.length ?? 0, new Set(node.Variants?.map(v => v.Constraints)).size);
    // pass
  })
})

assertEq(data.Enums.length, new Set(data.Enums.map(v => v.Identifier)).size)


save("data.json", data);