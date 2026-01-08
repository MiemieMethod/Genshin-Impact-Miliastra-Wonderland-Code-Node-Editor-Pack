// --- AST Definitions ---

export type ASTNode =
  | ArithmeticProgram
  | VariableDeclaration
  | ReturnStatement
  | CallExpression
  | Identifier
  | Literal
  | ArrayExpression
  | ObjectExpression;

export type ASTExpr =
  | CallExpression
  | Identifier
  | Literal;

export interface ArithmeticProgram {
  type: 'ArithmeticProgram';
  body: ASTNode[];
}

export interface VariableDeclaration {
  type: 'VariableDeclaration';
  identifier: string;
  init: ASTNode;
}

export interface ReturnStatement {
  type: 'ReturnStatement';
  argument: ASTNode;
}

/** * 核心节点: 涵盖了 m.sin(), a+b (m.add), struct.x (m.split), arr[i] (m.list_item) 
 */
export interface CallExpression {
  type: 'CallExpression';
  callee: string; // e.g., "m.add", "m.split", "user_func"
  arguments: ASTNode[];
}

export interface Identifier {
  type: 'Identifier';
  name: string;
}

export interface Literal {
  type: 'Literal';
  value: number | boolean | string;
  raw: string;
}

// 仅用于 Return 语句
export interface ArrayExpression {
  type: 'ArrayExpression';
  elements: ASTNode[];
}

// 仅用于 Return 语句
export interface ObjectExpression {
  type: 'ObjectExpression';
  properties: { key: string; value: ASTNode }[];
}
