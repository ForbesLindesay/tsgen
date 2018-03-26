import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printBooleanLiteral(
  node: bt.BooleanLiteral,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type BooleanLiteral', node);
}
