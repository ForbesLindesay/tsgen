import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printNullableTypeAnnotation(node: bt.NullableTypeAnnotation, ctx: Context): string {
  return 'null | void | ' + print(node.typeAnnotation, ctx);
}
