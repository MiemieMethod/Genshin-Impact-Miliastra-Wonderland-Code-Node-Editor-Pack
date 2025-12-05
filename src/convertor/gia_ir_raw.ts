
import assert from "assert";
import { helper, Graph, Node, todo, gia_node } from "../../utils/index.ts";
import type { IR_CallNode, IR_FunctionArg, IR_GraphModule, IR_Node } from "../types/IR.ts";

export function giaToRawIRModule(g: Graph): IR_GraphModule {
  const nodes = g.get_nodes();
  const node_map = new Map<Node, IR_Node>();
  // helper.get_node_name_from_id(1);
  for (const n of nodes) {
    const ir_node = node_to_raw_ir(n);
    node_map.set(n, ir_node);
  }
  return {
    kind: "module",
    imports: [],
    globals: [],
    node_vars: [],
    local_vars: [],
    defines: [],
    components: [],
    lambdas: [],
    shared_funcs: [],
    graph: [],
    _id: 0,
    _srcRange: {
      start: 0,
      end: 0
    }
  }
}

function node_to_raw_ir(n: Node): IR_CallNode {
  const gid = n.GenericId;
  const cid: number | undefined = n.ConcreteId;
  if (cid === undefined) {
    return todo("Handle nodes without ConcreteId in giaToRawIRModule");
  }
  const node_name = helper.get_node_name_from_id(cid);
  const name = "_" + node_name?.replaceAll("_", "");
  return {
    kind: "call",
    class: "Sys",
    name: name,
    inputs: [],
    outputs: [],
    branches: [],
    _id: 0,
    _srcRange: {
      start: 0,
      end: 0
    }
  };
}

// function to_ir_function_arg(type: ): IR_FunctionArg {
//   return {
//     expr: [],
//     name: null,
//     type: null
//   };
// }