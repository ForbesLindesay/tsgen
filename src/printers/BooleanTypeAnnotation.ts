import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printBooleanTypeAnnotation(node: bt.BooleanTypeAnnotation, ctx: Context): string {
  return 'boolean';
}
