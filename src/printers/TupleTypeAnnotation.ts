import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTupleTypeAnnotation(
  node: bt.TupleTypeAnnotation,
  ctx: Context,
): string {
  return '[' + node.types.map(t => print(t, ctx)).join(',') + ']';
}
