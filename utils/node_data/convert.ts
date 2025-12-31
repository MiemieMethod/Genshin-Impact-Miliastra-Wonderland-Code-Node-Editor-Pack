import { Document as Old } from "./data.old.ts";
import { type Document, GRAPH_CATEGORY_CONSTS, GRAPH_ID_RANGE } from "./consts.ts";

import { writeFileSync } from "fs";

const doc: Document = {
  Version: "",
  GameVersion: "",
  Author: "",
  Date: "",
  Description: "",
  Schema: "",
  Types: [],
  Nodes: [],
  Enums: [],
  SystemConstants: { GRAPH_CATEGORY_CONSTS, GRAPH_ID_RANGE }
};

writeFileSync("data.json", JSON.stringify(doc, null, 2));