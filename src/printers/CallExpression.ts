import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printCallExpression(
  node: bt.CallExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type CallExpression', node);
}
