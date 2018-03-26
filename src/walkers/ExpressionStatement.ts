import * as bt from 'babel-types';
import Context from '../Context';

export default function walkExpressionStatement(
  node: bt.ExpressionStatement,
  ctx: Context,
): bt.Identifier[] {
  // N.B. it's not really safe to ignore expression statements, but often it turns out fine
  // throw ctx.getError('Unsupported type ExpressionStatement', node);
}
