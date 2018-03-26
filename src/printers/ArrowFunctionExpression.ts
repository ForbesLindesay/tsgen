import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printArrowFunctionExpression(
  node: bt.ArrowFunctionExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type ArrowFunctionExpression', node);
}
