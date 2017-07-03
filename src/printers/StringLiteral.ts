import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printStringLiteral(node: bt.StringLiteral, ctx: Context): string {
  return JSON.stringify(node.value);
}
