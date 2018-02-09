import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printIdentifier(
  node: bt.Identifier,
  ctx: Context,
): string {
  ctx.output.request(node);
  return node.name;
}
