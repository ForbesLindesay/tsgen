import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printNullLiteralTypeAnnotation(node: bt.NullLiteralTypeAnnotation, ctx: Context): string {
  return 'null';
}
