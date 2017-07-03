import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printExportSpecifier(node: bt.ExportSpecifier, ctx: Context): string {
  if (node.imported) {
    throw ctx.getError('Did not exect export specifier to have an imported property.', node);
  }
  if (node.local.name === node.exported.name) {
    return `{${print(node.local, ctx)}}`;
  }
  return `{${node.exported.name}: ${print(node.local, ctx)}}`;
}
