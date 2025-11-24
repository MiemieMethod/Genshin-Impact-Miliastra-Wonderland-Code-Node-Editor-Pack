
import { gia } from "./index.ts";
import type { GraphNode } from "../protobuf/gia.proto.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { readFileSync, writeFileSync } from "fs";

function generate_all_nodes(from: number, size: number = 300, line_width: number = 20, offsets: number = 1): GraphNode[] {
  const ret = [];
  for (let i = 0; i < size; i++) {
    const y = Math.floor(i / line_width);
    const x = i % line_width;
    for (let k = 0; k < offsets; k++) {
      ret.push(gia.basic_node_body({
        generic_id: from + i as any,
        concrete_id: from + i + k as any,
        x: x,
        y: y * 2,
      }));
    }
  }
  return ret;
}
function gen_node(id1: number, id2?: number) {
  const i2 = id2 ?? id1;
  return gia.basic_node_body({
    generic_id: id1 as any,
    concrete_id: i2 as any,
    x: id1,
    y: i2 - id1,
  });
}

// ====== Step 1 ======
function create_graph(w: number = 20, h: number = 15, len: number = 1) {
  const N = w * h * len;
  console.time(`Create ${N} nodes in`);

  const uid = gia.random_int(9, "201");
  const graph_id = gia.random_int(10, "102");
  const nodes = [];
  const graph = gia.basic_graph_body({
    uid: uid,
    graph_id: graph_id,
    nodes: generate_all_nodes(1, w * h, w, len),
  });

  console.timeEnd(`Create ${N} nodes in`);
  console.log(graph);

  console.time(`Encode ${N} nodes in`);
  encode_gia_file({
    out_path: "./utils/ref/all_server_nodes.gia",
    gia_struct: graph
  })
  console.timeEnd(`Encode ${N} nodes in`);
  console.log("Saved to", "./utils/ref/all_server_nodes.gia");
}
function read_trimmed_graph() {
  const graph = decode_gia_file({
    gia_path: "./utils/ref/all_server_nodes_trim.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  const tags = nodes.map(x => [x.genericId.nodeId, x.concreteId?.nodeId]);
  const res = tags.map(([b, d]) => d === undefined ? `${b}:Generic` : `${b}:Basic`);
  writeFileSync("./utils/node_id/ref/generic.txt", res.join("\n"));
}
function get_graph_ids(type?: "Generic" | "Basic"): number[] {
  const data = readFileSync("./utils/node_id/ref/generic.txt").toString();
  const nodes = data.split("\n").map(x => x.split(":"));
  return nodes.filter((x) => type === undefined || x[1] === type).map(x => parseInt(x[0]));
}
function read_derive_trimmed_graph() {
  const graph = decode_gia_file({
    gia_path: "./utils/ref/derived_server_nodes_trim.gia",
  });
  const nodes = graph.graph.graph!.inner.graph.nodes!;
  const tags = nodes.map(x => [x.genericId.nodeId, x.concreteId?.nodeId]);
  console.log(tags);
  // const res = tags.map(([b, d]) => d === undefined ? `${b}:Generic` : `${b}:Basic`);
  // writeFileSync("./utils/node_id/ref/generic.txt", res.join("\n"));
}


// ====== Step 2 ======
function create_derived(from: number = 0, to: number = 15, len: number = 10) {
  const ids = get_graph_ids("Generic");
  const exist_ids = new Set(get_graph_ids());
  const N = (to - from) * len;
  console.time(`Create ${N} nodes in`);

  let cnt = 0;
  const uid = gia.random_int(9, "201");
  const graph_id = gia.random_int(10, "102");
  const nodes = [];
  while (from < to) {
    const id1 = ids[from++];
    for (let i = id1 + 1; i <= id1 + len; i++) {
      if (!exist_ids.has(i)) {
        const nodes = gia.basic_node_body({
          generic_id: id1 as any,
          concrete_id: i as any,
          x: id1,
          y: i - id1,
        });
        nodes.push(gen_node(id1, i));
        cnt++;
      }
    }
  }
  const graph = gia.basic_graph_body({
    uid: uid,
    graph_id: graph_id,
    nodes: nodes,
  });

  console.timeEnd(`Create ${N} nodes in`);
  console.log("Create", cnt, "nodes in reality.");
  console.log(graph);

  console.time(`Encode ${cnt} nodes in`);
  encode_gia_file({
    out_path: "./utils/ref/derived_server_nodes.gia",
    gia_struct: graph
  })
  console.timeEnd(`Encode ${cnt} nodes in`);
  console.log("Saved to", "./utils/ref/derived_server_nodes.gia");
}




if (import.meta.main) {
  // Step 1
  // create_graph(100, 30, 1);
  // read_trimmed_graph();

  // Step 2
  create_derived(0, 57, 20);
  // read_derive_trimmed_graph();
}