import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printBinaryExpression(
  node: bt.BinaryExpression,
  ctx: Context,
): string {
  // "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=";
  switch (node.operator) {
    case '+':
      return print(node.left, ctx);
  }
  throw ctx.getError('Unsupported type BinaryExpression', node);
}
