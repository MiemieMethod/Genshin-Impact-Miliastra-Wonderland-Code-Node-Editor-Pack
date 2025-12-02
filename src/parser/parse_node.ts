import type { IR_AnchorNode, IR_BranchNode, IR_CallNode, IR_EvalNode, IR_InOutNode, IR_JumpNode, IR_Node } from "../types/IR_node.ts";
import type { ParserState } from "../types/parser.ts";
import { peekIs } from "./utils.ts";

export function parseNode(
  state: ParserState,
): IR_Node {
  if (peekIs(state, "identifier")) {
    if (peekIs(state, "identifier", "$")) {
      return parse_eval(state);
    }
    if (peekIs(state, "identifier", "Branch")) {
      return parseAnchorNode(state);
    }
    if (peekIs(state, "identifier", "In") || peekIs(state, "identifier", "Out")) {
      return parseInOutNode(state);
    }
    return parseCallNode(state);
  }
  if (peekIs(state, "brackets", "{")) {
    return parse_branch(state);
  }
  if (peekIs(state, "int") || peekIs(state, "string") || peekIs(state, "boolean")) {
    return parse_jump(state);
  }
  throw new Error("Unexpected token");
}

function parse_eval(state: ParserState): IR_EvalNode {

}
export function parseAnchorNode(state: ParserState): IR_AnchorNode {

}
export function parseInOutNode(state: ParserState): IR_InOutNode {

}
export function parseCallNode(state: ParserState): IR_CallNode {

}
function parse_branch(state: ParserState): IR_BranchNode {

}
function parse_jump(state: ParserState): IR_JumpNode {

}
