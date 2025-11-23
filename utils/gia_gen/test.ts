
import { gia } from "./index.ts";
import type { GraphNode } from "../protobuf/gia.proto.ts";
import { encode_gia_file } from "../protobuf/decode.ts";

function generate_all_nodes(from: number, size: number = 300, line_width: number = 20): GraphNode[] {
  const ret = [];
  for (let i = 0; i < size; i++) {
    const y = Math.floor(i / line_width);
    const x = i % line_width;
    ret.push(gia.basic_node_body({
      generic_id: from + i as any,
      concrete_id: from + i as any,
      x: x,
      y: y * 2,
    }));
  }
  return ret;
}

function create_graph(w: number = 20, h: number = 15) {
  console.time(`Create ${w * h} nodes in`);

  const uid = gia.random_int(9, "201");
  const graph_id = gia.random_int(10, "102");
  const graph = gia.basic_graph_body({
    uid: uid,
    graph_id: graph_id,
    nodes: generate_all_nodes(0, w * h, w),
  });

  console.timeEnd(`Create ${w * h} nodes in`);
  console.log(graph);

  console.time(`Encode ${w * h} nodes in`);
  encode_gia_file({
    out_path: "./utils/ref/" + graph.graph.name,
    gia_struct: graph
  })
  console.timeEnd(`Encode ${w * h} nodes in`);
  console.log("Saved to", "./utils/ref/" + graph.graph.name);
}

if (import.meta.main) {
  create_graph(50, 20);
}