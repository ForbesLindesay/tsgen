import * as bt from 'babel-types';
import Context from '../Context';

export default function walkClassDeclaration(
  node: bt.ClassDeclaration,
  ctx: Context,
): bt.Identifier[] {
  throw ctx.getError('Unsupported type ClassDeclaration', node);
}
