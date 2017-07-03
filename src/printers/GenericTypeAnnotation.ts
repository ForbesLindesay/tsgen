import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printGenericTypeAnnotation(node: bt.GenericTypeAnnotation, ctx: Context): string {
  return print(node.id, ctx) + (node.typeParameters ? print(node.typeParameters, ctx) : '');
}
