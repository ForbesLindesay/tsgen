import * as bt from 'babel-types';
import Context from '../Context';

export default function walkDeclareVariable(
  node: bt.DeclareVariable,
  ctx: Context,
): bt.Identifier[] {
  throw ctx.getError('Unsupported type DeclareVariable', node);
}
