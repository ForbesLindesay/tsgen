import * as bt from 'babel-types';
import Context from '../Context';

export default function walkImportDeclaration(node: bt.ImportDeclaration, ctx: Context): bt.Identifier[] {
  return node.specifiers.map(specifier => {
    ctx.declare(specifier.local, {
      type: "SingleImportDeclaration",
      specifier,
      source: node.source,
      start: node.start,
      end: node.end,
      loc: node.loc,
    });
    return specifier.local;
  });
}
