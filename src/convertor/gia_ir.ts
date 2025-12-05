import { Graph } from "../../utils/index.ts";
import { IR_GraphModule } from "../types/IR.ts";
import { giaToRawIRModule } from "./gia_ir_raw.ts";

function giaIrConvertor(gia: Graph, raw: true): IR_GraphModule {
  if (raw) {
    return giaToRawIRModule(gia);
  } else {
    throw new Error("Non-raw conversion not implemented yet");
  }
}

