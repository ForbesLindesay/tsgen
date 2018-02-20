import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printMixedTypeAnnotation(
  node: bt.MixedTypeAnnotation,
  ctx: Context,
): string {
  return 'null | void | {}';
}
