import { readFileSync } from "fs";
import { parse } from "./proto2ts.ts";
import { ProtobufParser } from "./decode_raw.ts";
import { verifyProto } from "./verify_proto.ts";
import { inspect } from "util";

const PATH = "c:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/2.gia";


const layers = parse(readFileSync(import.meta.dirname + "/gia.proto").toString());
const parser = new ProtobufParser(true)
const { result, tags } = parser.parseMessage(new Uint8Array(readFileSync(PATH)).slice(20, -4));

// console.log(result);

const errors1 = verifyProto(result, layers.message.get("Root")!);
console.log("Errors:", inspect(errors1.filter(x => x.type !== "MISSING_FIELD" && !x.path.startsWith("root.accessories.structureDef")), { depth: Infinity, colors: true }));
