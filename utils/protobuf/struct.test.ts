import { decode_gia_file, encode_gia_file } from "./decode.ts";



const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

const n = decode_gia_file({ gia_path: PATH + "temp.gia" });
n.graph.graph!.inner.graph.nodes[0].pins[0].value.bNodeValue!.value = {} as any;
n.graph.graph!.inner.graph.nodes[1].pins[0].value.bNodeValue!.value = {} as any;
n.graph.graph!.inner.graph.affiliations = [];
encode_gia_file({ out_path: PATH + "temp2.gia", gia_struct: n });