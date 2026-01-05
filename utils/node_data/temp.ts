import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import type { EnumDef, EnumTypeDef } from "./types.ts";
import { assert, assertDeepEq, assertEq, assertEqs, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
import * as NT from "./node_type.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) =>
  writeFileSync(
    import.meta.dirname + "/" + path, typeof data === "string" ?
    data :
    JSON.stringify(data, null, 2)
    // format(JSON.parse(stableStringify(data)!), { indent: 2, maxLength: 120 })
  );

// TODO: VisiblePin8(10) of Execution.Character_Skill_Client.Trigger_Sphere_Hitbox_Loc's type conflicts with others

data.Nodes.forEach((node) => {
  node.FlowPins.forEach((pin) => {
    pin.ShellIndex ??= 0
  });
});

save("data.json", data);

