import * as bt from 'babel-types';
import Context from '../Context';

export default function walkIfStatement(
  node: bt.IfStatement,
  ctx: Context,
): bt.Identifier[] {
  throw ctx.getError('Unsupported type IfStatement', node);
}
