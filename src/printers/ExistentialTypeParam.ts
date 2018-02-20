import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printExistentialTypeParam(
  node: bt.ExistentialTypeParam,
  ctx: Context,
): string {
  return 'any';
}
