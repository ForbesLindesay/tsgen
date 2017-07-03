import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printStringTypeAnnotation(node: bt.StringTypeAnnotation, ctx: Context): string {
  return 'string';
}
