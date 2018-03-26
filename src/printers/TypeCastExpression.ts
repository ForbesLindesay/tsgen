import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTypeCastExpression(
  node: bt.TypeCastExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type TypeCastExpression', node);
}
