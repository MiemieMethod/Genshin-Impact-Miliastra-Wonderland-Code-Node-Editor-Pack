import { readFileSync, writeFileSync } from "fs";
import data from "./data.json" with {type: "json"};
import { assert, assertDeepEq, assertEq, exclude_keys } from "../utils.ts";
const read = (path: string) => readFileSync(import.meta.dirname + "/" + path).toString();
const save = (path: string, data: {} | string) => writeFileSync(import.meta.dirname + "/" + path, typeof data === "string" ? data : JSON.stringify(data, null, 2));

// const names = data.Nodes.map(x => x.Identifier).sort();
// assertEq(names.length, new Set(names).size);

// save("temp.txt", names.join("\n"));

const ref = new Map(read("temp.txt").split("\n").map(x => x.split(":").map(y => y.trim())));
// const names = data.Nodes.map(x => x.Identifier).sort();
// names.forEach((x, i) => assertEq(x, ref[i].split(":")[0]));

data.Nodes.forEach(x => {
  const d = x.Identifier.split(".");
  d[2] = ref.get(x.Identifier)!;
  assert(d[2].length > 0);
  x.Identifier = d.join(".");
});

assert(data.Nodes.every(x => !x.Identifier.includes("undefined")));

save("data.json", data);