import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printArrayTypeAnnotation(
  node: bt.ArrayTypeAnnotation,
  ctx: Context,
): string {
  return print(node.elementType, ctx) + '[]';
}
