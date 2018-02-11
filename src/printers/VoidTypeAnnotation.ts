import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printVoidTypeAnnotation(
  node: bt.VoidTypeAnnotation,
  ctx: Context,
): string {
  return 'void';
}
