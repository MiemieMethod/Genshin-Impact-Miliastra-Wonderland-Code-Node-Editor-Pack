import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
import { nodeDefinitions as REF } from "../../ref/Columbina-Dev/WebMiliastraNodesEditor/src/data/nodeDefinitions.ts"
import { parse, stringify } from "yaml";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

// save("enum_lookup.yaml", stringify({
//   Server: data.Enums.filter(x => x.System === "Server").map(x => Object.fromEntries([
//     [x.Identifier, x.ID],
//     ["name", x.InGameName.en],
//     ["items", Object.fromEntries(x.Items.map(y => [y.Identifier, y.ID]))]
//   ])),
//   Client: data.Enums.filter(x => x.System === "Client").map(x => Object.fromEntries([
//     [x.Identifier, x.ID],
//     ["name", x.InGameName.en],
//     ["items", Object.fromEntries(x.Items.map(y => [y.Identifier, y.ID]))]
//   ]))
// }));

// assertEq(new Set(data.Enums.map(x => x.Identifier)).size, data.Enums.length);

// 修改全部枚举类型为标准枚举
data.Nodes.forEach(node => {
  node.DataPins.forEach(p => {
    if (/^E\<.+\>$/.test(p.Type)) {
      if (p.Type === "E<1016>") {
        p.Type = "Loc"
        return;
      }
      if (p.Type === "E<1028>") {
        p.Type = "Vss"
        return;
      }
      const cc4 = data.Enums.find(x => x.System === node.System && x.ID === parseInt(p.Type.slice(2, -1)));
      assert(cc4 !== undefined);
      p.Type = `E<${cc4.Identifier}>`
    }
  })
})

save("data.json", data);



data.Nodes.forEach(node => {
  // 确实有正确的引脚
  assert(node.DataPins.filter(x => x.Direction === "In").every((x, i) => x.ShellIndex === i));
  assert(node.DataPins.filter(x => x.Direction === "Out").every((x, i) => x.ShellIndex === i));
  assert(node.DataPins.every(x => x.Direction === "Out" || x.Direction === "In"));
  assert(node.DataPins.every(x => x.Type.length >= 3));

  if (node.__ref_id === undefined) return;
  const ref = REF.find(x => x.id === node.__ref_id)!;
  assert(ref !== undefined);

  if (node.DataPins.filter(x => x.Direction === "Out").length !== ref.ports.filter(p => p.kind === "data-out").length) {
    console.log(
      node.Identifier,
      node.DataPins.filter(x => x.Direction === "Out").length,
      ref.ports.filter(p => p.kind === "data-out").length
    );
  }

});

// save("data.json", data);