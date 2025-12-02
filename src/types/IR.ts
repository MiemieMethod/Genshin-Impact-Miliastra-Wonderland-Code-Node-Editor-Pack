import type { DefineDecl, GlobalDecl, ImportDecl, LocalVarDecl, NodeVarDecl } from "./IR_decl.ts";
import { ComponentDecl, LambdaDecl, SharedFuncDecl } from "./IR_func.ts";
import { IR_ExecutionBlock } from "./IR_node.ts";
import type { IRBase } from "./types.ts";

export type {
  IR_NodeChain,
  IR_Node,
  IR_CallNode,
  IR_EvalNode,
  IR_BranchNode,
  IR_AnchorNode,
  IR_JumpNode,
  IR_InOutNode,
  IR_Trigger,
  IR_ExecutionBlock,
  IR_FunctionArg,
} from "./IR_node.ts";

export type {
  SharedFuncDecl,
  LambdaDecl,
  ComponentDecl,
} from "./IR_func.ts";

export type {
  ImportDecl,
  GlobalDecl,
  StructDecl,
  GlobalVarDecl,
  TimerDecl,
  SignalDecl,
  NodeVarDecl,
  LocalVarDecl,
  DefineDecl,
} from "./IR_decl.ts";

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