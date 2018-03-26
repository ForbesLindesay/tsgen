import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printMemberExpression(
  node: bt.MemberExpression,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type MemberExpression', node);
}
