import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printAnyTypeAnnotation(
  node: bt.AnyTypeAnnotation,
  ctx: Context,
): string {
  return 'any';
}
