import * as bt from 'babel-types';
import Context from '../Context';
import walk from './';

export default function walkExportDefaultDeclaration(node: bt.ExportDefaultDeclaration, ctx: Context): bt.Identifier[] {
  if (ctx.defaultExport !== null) {
    throw ctx.getError('You can only have one default export per file', node);
  }
  if (bt.isDeclaration(node.declaration)) {
    const ids = walk(node.declaration, ctx);
    if (ids.length !== 1) {
      throw ctx.getError('Expected exactly one declaration but got ' + ids.length, node);
    }
    ctx.setDefaultExport(ids[0]);
    return ids;
  } else {
    ctx.setDefaultExport(node.declaration);
    return [];
  }
}
