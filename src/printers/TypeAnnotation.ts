import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTypeAnnotation(
  node: bt.TypeAnnotation,
  ctx: Context,
): string {
  return print(node.typeAnnotation, ctx);
}
