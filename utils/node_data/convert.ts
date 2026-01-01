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
  // const ref = REF.find(r => r.id === node.__ref_id);
  // if (ref === undefined) return;
  node.DataPins.forEach(pin => {
    pin.Type = pin.Type.replaceAll(/E<(\d*)>/g, (match, p1) => {
      const cc4 = data.Enums.find(e => e.System === node.System && e.ID === parseInt(p1));
      assert(cc4 !== undefined);
      return `E<${cc4.Identifier}>`;
    })
  })
  node.Variants?.forEach(v => {
    v.Constraints = v.Constraints.replaceAll(/E<(\d*)>/g, (match, p1) => {
      const cc4 = data.Enums.find(e => e.System === node.System && e.ID === parseInt(p1));
      assert(cc4 !== undefined);
      return `E<${cc4.Identifier}>`;
    })
  })
})


save("data.json", data);