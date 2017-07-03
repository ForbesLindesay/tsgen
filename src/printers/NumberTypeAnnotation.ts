import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printNumberTypeAnnotation(node: bt.NumberTypeAnnotation, ctx: Context): string {
  return 'number';
}
