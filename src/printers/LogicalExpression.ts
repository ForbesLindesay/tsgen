import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printLogicalExpression(
  node: bt.LogicalExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type LogicalExpression', node);
}
