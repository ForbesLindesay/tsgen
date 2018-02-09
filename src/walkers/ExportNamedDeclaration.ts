import * as bt from 'babel-types';
import Context from '../Context';
import walk from './';

export default function walkExportNamedDeclaration(
  node: bt.ExportNamedDeclaration,
  ctx: Context,
): bt.Identifier[] {
  if (node.declaration) {
    const identifiers = walk(node.declaration, ctx);
    return identifiers.map(id => {
      ctx.addNamedExport({
        type: 'ExportSpecifier',
        local: id,
        imported: undefined as any,
        exported: id,
        start: id.start,
        end: id.end,
        loc: id.loc,
      });
      return id;
    });
  }
  node.specifiers.forEach(specifier => {
    ctx.addNamedExport(specifier);
  });
  return [];
}
