import * as bt from 'babel-types';
import Context from '../Context';

export default function walkDeclareClass(
  node: bt.DeclareClass,
  ctx: Context,
): bt.Identifier[] {
  ctx.declare(node.id, node);
  return [node.id];
}
