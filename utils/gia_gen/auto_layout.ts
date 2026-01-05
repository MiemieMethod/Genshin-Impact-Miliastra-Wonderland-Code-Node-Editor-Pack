import type * as dTypes from 'dagre';

import { createRequire } from 'module';

// 判断是否浏览器
let d: any;
if (typeof window !== 'undefined') {
  d = window.dagre;
} else {
  const require = createRequire(import.meta.url);
  d = require("@dagrejs/dagre");
}



import { Graph, Node } from './interface.ts';

export interface LayoutOption {
  node_sep: number;
  edge_sep: number;
  rank_sep: number;
  data_pin_height: number;
  flow_pin_height: number;
  pin_width: number;
  title_height: number;
  min_width: number;
  min_height: number;
}

function get_node_size(node: Node, opt: LayoutOption): [number, number] {
  const d_in = node.def.DataPins.filter(p => p.Direction === "In").length;
  const d_out = node.def.DataPins.filter(p => p.Direction === "Out").length;
  const f_in = node.def.FlowPins.filter(p => p.Direction === "In").length;
  const f_out = node.def.FlowPins.filter(p => p.Direction === "Out").length;
  const height_in = d_in * opt.data_pin_height + f_in * opt.flow_pin_height;
  const height_out = d_out * opt.data_pin_height + f_out * opt.flow_pin_height;
  const height = Math.max(height_in, height_out);
  const width = opt.pin_width;
  const pin_col = Number((d_in + f_in) > 0) + Number((d_out + f_out) > 0) || 1;
  return [Math.max(width * pin_col, opt.min_width), Math.max(height + opt.title_height, opt.min_height)];
}

export function auto_layout(graph: Graph, options: Partial<LayoutOption>) {
  const opt: LayoutOption = {
    node_sep: options.node_sep ?? 100,
    edge_sep: options.edge_sep ?? 50,
    rank_sep: options.rank_sep ?? 300,
    data_pin_height: options.data_pin_height ?? 60,
    flow_pin_height: options.flow_pin_height ?? 60,
    pin_width: options.pin_width ?? 130,
    title_height: options.title_height ?? 60,
    min_width: options.min_width ?? 200,
    min_height: options.min_height ?? 100,
  };

  const g: dTypes.graphlib.Graph = new d.graphlib.Graph();
  g.setGraph({
    rankdir: "LR",
    align: undefined,
    nodesep: opt.node_sep,
    edgesep: opt.edge_sep,
    ranksep: opt.rank_sep,
    acyclicer: "greedy",
  });
  g.setDefaultEdgeLabel(function () { return {}; });

  for (const [id, node] of graph.nodes.entries()) {
    const [w, h] = get_node_size(node, opt);
    g.setNode(id.toString(), { width: w, height: h });
  }
  for (const flow of graph.flows) {
    g.setEdge(flow.from.node_index.toString(), flow.to.node_index.toString());
  }
  for (const connect of graph.connects) {
    g.setEdge(connect.from.node_index.toString(), connect.to.node_index.toString());
  }

  // Arrange Layout
  d.layout(g);

  graph.nodes.forEach((node) => {
    const n = g.node(node.node_index.toString());
    const [w, h] = get_node_size(node, opt);
    node.x = n.x - w / 2;
    node.y = n.y - h / 2;
  });
}

function test() {
  const g: dTypes.graphlib.Graph = new d.graphlib.Graph();
  g.setGraph({
    rankdir: "LR",
    align: undefined,
    nodesep: 50,
    edgesep: 10,
    ranksep: 100,
    acyclicer: "greedy",
  });

  g.setDefaultEdgeLabel(function () { return {}; });
  g.setNode("A", { width: 300, height: 200 });
  g.setNode("B", { width: 300, height: 200 });
  g.setNode("C", { width: 300, height: 200 });
  g.setNode("E", { width: 300, height: 200 });
  g.setNode("D", { width: 300, height: 200 });
  g.setNode("T", { width: 300, height: 200 });

  g.setEdge("A", "B");
  g.setEdge("A", "E");
  g.setEdge("B", "T");
  g.setEdge("C", "T");
  g.setEdge("E", "D");
  g.setEdge("D", "T");

  d.layout(g);

  g.nodes().forEach(function (v) {
    console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
  });
  g.edges().forEach(function (e) {
    console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
  });
}

if (import.meta.main) {
  test();
}