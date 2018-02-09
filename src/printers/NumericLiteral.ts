import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printNumericLiteral(
  node: bt.NumericLiteral,
  ctx: Context,
): string {
  return JSON.stringify(node.value);
}
