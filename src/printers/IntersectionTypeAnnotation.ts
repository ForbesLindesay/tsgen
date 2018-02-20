import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printIntersectionTypeAnnotation(
  node: bt.IntersectionTypeAnnotation,
  ctx: Context,
): string {
  return node.types.map(t => print(t, ctx)).join(' & ');
}
