import type { NodeType } from "../../utils/index.ts";
import type { ASTExpr } from "../types/AST_expr.ts";
import { AST_BP } from "../types/consts.ts";
import type { IR_FunctionArg } from "../types/IR_node.ts";
import type { ParserState } from "../types/types.ts";
import { parseExpression } from "./parse_expr.ts";
import { parse_type } from "./parse_utils.ts";
import { expect, match, next, peek, peekIs } from "./utils.ts";

// 辅助: 解析函数参数列表 (arg1, arg2)
export function parsePureArguments(state: ParserState): ASTExpr[] {
  const args: ASTExpr[] = [];
  if (!match(state, 'brackets', ')')) {
    do {
      args.push(parseExpression(state, AST_BP.NONE));
    } while (match(state, 'symbol', ','));

    if (peek(state)?.value !== ')') {
      expect(state, 'brackets', ')');
    } else {
      next(state);
    }
  }
  return args;
}


// 辅助: 解析函数参数列表 (arg1 (= expr)? (as NodeType)?, arg1 (= expr)? (as NodeType)?)
export function parseInArguments(state: ParserState): (IR_FunctionArg & { kind: "in" })[] {
  expect(state, "brackets", "(");
  const args: (IR_FunctionArg & { kind: "in" })[] = [];
  if (!match(state, 'brackets', ')')) {
    do {
      const res: IR_FunctionArg & { kind: "in" } = {
        expr: undefined as any,
        name: null,
        kind: "in",
        type: null,
      }
      if (peek(state)?.type === "identifier" && peek(state, 1)?.type === "assign") {
        // arg1 =
        res.name = expect(state, "identifier").value;
        expect(state, "assign", "=");
      }
      res.expr = parseExpression(state, AST_BP.NONE);
      if (peekIs(state, "identifier", "as")) {
        // as Type
        next(state);
        res.type = parse_type(state);
      }
      args.push(res);
    } while (match(state, 'symbol', ',') || match(state, 'symbol', ')'));
    expect(state, 'brackets', ')');
  }
  return args;
}

// 辅助: 解析函数参数列表 [arg1 (= identifier)? (as NodeType)?, arg1 (= identifier)? (as NodeType)?]
export function parseOutArguments(state: ParserState): (IR_FunctionArg & { kind: "out" })[] {
  expect(state, "brackets", "[");
  const args: (IR_FunctionArg & { kind: "out" })[] = [];
  if (!match(state, 'brackets', ']')) {
    do {
      const res: IR_FunctionArg & { kind: "out" } = {
        expr: undefined as any,
        name: null,
        kind: "out",
        type: null,
      }
      if (peek(state)?.type === "identifier" && peek(state, 1)?.type === "assign") {
        // arg1 =
        res.name = expect(state, "identifier").value;
        expect(state, "assign", "=");
      }
      res.expr = {
        type: "Identifier",
        name: expect(state, "identifier").value,
      };
      if (peekIs(state, "identifier", "as")) {
        // as Type
        next(state);
        res.type = parse_type(state);
      }
      args.push(res);
    } while (match(state, 'symbol', ',') || match(state, 'symbol', ']'));
    expect(state, 'brackets', ']');
  }
  return args;
}