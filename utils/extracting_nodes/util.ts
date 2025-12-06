import { writeFileSync } from "fs";
import { encode_gia_file } from "../protobuf/decode.ts";

export function save(name: string, data: string | object) {
  if (typeof data === "object") {
    if (name.endsWith(".gia")) {
      encode_gia_file(import.meta.dirname + "/dist/" + name, data as any);
      return;
    }
    data = JSON.stringify(data, null, 2);
  }
  writeFileSync(import.meta.dirname + "/dist/" + name, data);
}