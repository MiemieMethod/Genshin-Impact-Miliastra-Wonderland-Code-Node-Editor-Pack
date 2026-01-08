import { stringify } from "../../utils/node_data/node_type.ts";
import type { ArithmeticProgram, ArrayExpression, ASTExpr, Literal, ObjectExpression, ReturnStatement, VariableDeclaration } from "../types/AST_expr.ts";
import { AST_PRECEDENCE, AST_BINARY_OP_SYMBOLS, AST_UNARY_OP_SYMBOLS } from "../types/consts.ts";

/**
* 反编译整个程序 Program
*/
export function decompile_program(program: ArithmeticProgram): string[] {
  return program.body.map(node => {
    if (node.type === 'VariableDeclaration') {
      return decompile_var_decl(node);
    }
    if (node.type === 'ReturnStatement') {
      return decompile_return(node);
    }
    return '';
  });
}

function decompile_var_decl(node: VariableDeclaration): string {
  const exprStr = decompile_expr(node.init);
  return `const ${node.identifier}${node.var_type ? `: ${stringify(node.var_type)}` : ''} = ${exprStr};`;
}

function decompile_return(node: ReturnStatement): string {
  const arg = node.argument;
  let retStr = '';

  if (arg.type === 'ObjectExpression') {
    retStr = decompile_object(arg);
  } else if (arg.type === 'ArrayExpression') {
    retStr = decompile_array(arg);
  } else {
    retStr = decompile_expr(arg as ASTExpr);
  }

  // Return 的分号是可选的，但为了整洁建议加上
  return `return ${retStr};`;
}

// 辅助: 对象字面量还原
function decompile_object(node: ObjectExpression): string {
  const props = node.properties.map(p => {
    // 假设值只能是 Expr
    return `${p.key}: ${decompile_expr(p.value as ASTExpr)}`;
  });
  return `{ ${props.join(', ')} }`;
}

// 辅助: 数组字面量还原
function decompile_array(node: ArrayExpression): string {
  const elems = node.elements.map(e => decompile_expr(e as ASTExpr));
  return `[${elems.join(', ')}]`;
}

/**
 * 核心: 反编译表达式
 * @param node AST 节点
 * @param parentPrecedence 父节点的优先级，用于判断是否加括号
 */
export function decompile_expr(node: ASTExpr, parentPrecedence: number = 0): string {

  // 1. 字面量: 直接返回 raw
  if (node.type === 'Literal') {
    return node.raw;
  }

  // 2. 标识符: 直接返回 name
  if (node.type === 'Identifier') {
    return node.name;
  }

  // 3. CallExpression: 核心处理
  if (node.type === 'CallExpression') {
    const callee = node.callee;
    const args = node.arguments as ASTExpr[];

    // --- Case A: 成员访问 (struct.x) ---
    // 映射: m.split(obj, 'prop') -> obj.prop
    if (callee === 'm.split') {
      const obj = decompile_expr(args[0], AST_PRECEDENCE.MEMBER);
      const propLiteral = args[1] as Literal; // 必定是 string literal
      // 去掉 raw 里的引号 (e.g. "'x'" -> "x")，或者直接使用 value
      const propName = String(propLiteral.value);
      return `${obj}.${propName}`;
    }

    // --- Case B: 数组索引 (arr[i]) ---
    // 映射: m.list_item(arr, i) -> arr[i]
    if (callee === 'm.list_item') {
      const arr = decompile_expr(args[0], AST_PRECEDENCE.CALL); // 左边优先级很高
      const index = decompile_expr(args[1], 0); // 中括号内重新开始计算优先级
      return `${arr}[${index}]`;
    }

    // --- Case C: 一元运算符 (-a, !a) ---
    if (AST_UNARY_OP_SYMBOLS[callee]) {
      const op = AST_UNARY_OP_SYMBOLS[callee];
      // 前缀运算符优先级很高 (PREFIX)
      const operand = decompile_expr(args[0], AST_PRECEDENCE.PREFIX);
      return `${op}${operand}`;
    }

    // --- Case D: 二元运算符 (a + b) ---
    if (AST_BINARY_OP_SYMBOLS[callee]) {
      const op = AST_BINARY_OP_SYMBOLS[callee];
      const currentPrec = getOpPrecedence(op);

      // 递归处理左右子树
      // 左子树: 只要 childPrec < currentPrec 就加括号
      const leftStr = decompile_expr(args[0], currentPrec);

      // 右子树: 为了处理结合性 (如 a - (b - c))，右边的要求更严格
      // 如果优先级相同，通常默认为左结合，所以右边如果同级也需要加括号
      // 修正逻辑: 传入 currentPrec + 0.1 或处理逻辑
      // 这里简化: 如果是右侧子节点，我们要求其优先级必须 严格大于 当前优先级，否则加括号
      // 这能处理 a - b - c -> (a - b) - c (不需要括号)
      // 和 a - (b - c) (需要括号)
      // 注意: + 和 * 满足结合律其实不需要，但 - 和 / 需要。为了统一安全，右侧加括号。
      const rightStr = decompile_expr(args[1], currentPrec + 0.1);

      const exprStr = `${leftStr} ${op} ${rightStr}`;

      // 如果当前优先级 < 父优先级，则需要外层括号
      if (currentPrec < parentPrecedence) {
        return `(${exprStr})`;
      }
      return exprStr;
    }

    // --- Case E: 普通函数调用 (fun(a, b)) ---
    // m.func(a) 或 user_func(a)
    // 优先级为 CALL (最高级之一)
    const argsStr = args.map(a => decompile_expr(a, 0)).join(', ');
    return `${callee}(${argsStr})`;
  }

  throw new Error(`Unknown node type: ${(node as any).type}`);
}

// 获取操作符的优先级
function getOpPrecedence(opSymbol: string): number {
  if (['||', '&&'].includes(opSymbol)) return AST_PRECEDENCE.LOGICAL;
  if (['===', '!==', '<', '>', '<=', '>='].includes(opSymbol)) return AST_PRECEDENCE.COMPARE;
  if (['<<', '>>'].includes(opSymbol)) return AST_PRECEDENCE.SHIFT;
  if (['+', '-'].includes(opSymbol)) return AST_PRECEDENCE.SUM;
  if (['*', '/', '%', '&', '|', '^'].includes(opSymbol)) return AST_PRECEDENCE.PRODUCT;
  return 0;
}