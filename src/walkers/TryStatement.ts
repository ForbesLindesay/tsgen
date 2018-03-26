import * as bt from 'babel-types';
import Context from '../Context';

export default function walkTryStatement(
  node: bt.TryStatement,
  ctx: Context,
): bt.Identifier[] {
  throw ctx.getError('Unsupported type TryStatement', node);
}
