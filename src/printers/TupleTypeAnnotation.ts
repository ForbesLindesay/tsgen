import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTupleTypeAnnotation(
  node: bt.TupleTypeAnnotation,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type TupleTypeAnnotation', node);
}
