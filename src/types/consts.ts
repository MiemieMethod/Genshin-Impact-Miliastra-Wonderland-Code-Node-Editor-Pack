import { NodeType } from "../../utils/gia_gen/nodes.ts";
import { Counter } from "../../utils/index.ts";

export const IR_Id_Counter = new Counter();

export const UNK_TYPE: NodeType = { t: "b", b: "Unk" as "Int" } as const;
