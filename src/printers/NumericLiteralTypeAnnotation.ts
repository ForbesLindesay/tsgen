import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printNumericLiteralTypeAnnotation(
  node: bt.NumericLiteralTypeAnnotation,
  ctx: Context,
): string {
  return '' + (node as any).value;
}
