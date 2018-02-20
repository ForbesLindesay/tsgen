import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printIdentifier(
  node: bt.Identifier,
  ctx: Context,
): string {
  switch (node.name) {
    case 'stream$Readable':
      return 'NodeJS.ReadableStream';
    case 'stream$Writable':
      return 'NodeJS.WritableStream';
    case 'Symbol':
      return 'symbol';
  }
  ctx.output.request(node);
  return node.name;
}
