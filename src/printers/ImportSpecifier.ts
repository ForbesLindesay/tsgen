import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printImportSpecifier(
  node: bt.ImportSpecifier,
  ctx: Context,
): string {
  if (node.local.name == node.imported.name) {
    return `{${node.local.name}}`;
  }
  return `{${node.imported.name} as ${node.local.name}}`;
}
