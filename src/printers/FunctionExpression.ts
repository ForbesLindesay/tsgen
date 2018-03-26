import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printFunctionExpression(
  node: bt.FunctionExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type FunctionExpression', node);
}
