import { Graph } from "../gia_gen/graph.ts";
import { decode_gia_file, encode_gia_file } from "./decode.ts";



const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

// console.time("graph_encode");
// const graph = new Graph("server");
// const node1 = graph.add_node(200); // add int
// const node2 = graph.add_node(201); // add float
// const node3 = graph.add_node(202); // sub int
// node1.setPos(1, 2);
// node2.setPos(3, 4);
// graph.connect(node1, node2, 0, 0);
// graph.connect(node3, node1, 0, 1);
// graph.connect(node3, node1, 0, 0);
// graph.connect(node3, node2, 0, 0);
// const g = graph.encode();
// console.timeEnd("graph_encode");

console.time("graph_encode");
const graph = new Graph("server");
const dest = graph.add_node(93); // timed effects
const src = graph.add_node(201); // add int
src.setPos(-3, 0);
// dest.add_pins

graph.connect(src, dest, 0, 0);
graph.connect(src, dest, 0, 1);
graph.connect(src, dest, 0, 2);
graph.connect(src, dest, 0, 3);
graph.connect(src, dest, 0, 4);
graph.connect(src, dest, 0, 5);
graph.connect(src, dest, 0, 6);
graph.connect(src, dest, 0, 7);
graph.connect(src, dest, 0, 8);


const g = graph.encode();
console.timeEnd("graph_encode");

encode_gia_file({ out_path: PATH + "temp.gia", gia_struct: g })