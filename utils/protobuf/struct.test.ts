import { decode_gia_file, encode_gia_file } from "./decode.ts";



const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

const n = decode_gia_file(PATH + "2.gia");
n.graph.graph!.inner.graph.nodes[0].nodeIndex = 3;
n.graph.graph!.inner.graph.nodes[0].pins[0].connects[0].id = 1;
n.graph.graph!.inner.graph.ioNodeIndex = 3;
n.graph.graph!.inner.graph.nodes[1].nodeIndex = 1;
// n.graph.graph!.inner.graph.nodes[1].pins[0].value.bConcreteValue!.value = {} as any;
// n.graph.graph!.inner.graph.affiliations = [];
encode_gia_file(PATH + "2_.gia", n);