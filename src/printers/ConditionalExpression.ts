import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printConditionalExpression(
  node: bt.ConditionalExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type ConditionalExpression', node);
}
