import type { DefineDecl, GlobalDecl, ImportDecl, LocalVarDecl, NodeVarDecl } from "./IR_decl.ts";
import { ComponentDecl, LambdaDecl, SharedFuncDecl } from "./IR_func.ts";
import { IR_ExecutionBlock } from "./IR_node.ts";
import type { IRBase } from "./types.ts";

export type * from "./IR_node.ts";

export type * from "./IR_func.ts";

export type * from "./IR_decl.ts";

export interface IR_GraphModule extends IRBase {
  kind: "module";
  // decls
  imports: ImportDecl[];
  globals: GlobalDecl[];
  node_vars: NodeVarDecl[];
  local_vars: LocalVarDecl[];
  defines: DefineDecl[];
  components: ComponentDecl[];
  lambdas: LambdaDecl[];
  shared_funcs: SharedFuncDecl[];
  // graph
  graph: IR_ExecutionBlock[];
}