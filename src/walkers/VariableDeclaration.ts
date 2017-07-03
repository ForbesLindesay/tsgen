import * as bt from 'babel-types';
import Context from '../Context';

export default function walkVariableDeclaration(node: bt.VariableDeclaration, ctx: Context): bt.Identifier[] {
  return node.declarations.map(declaration => {
    if (!bt.isIdentifier(declaration.id)) {
      throw ctx.getError('tsgen only supports identifiers as variable declarations', declaration.id);
    }
    ctx.declare(declaration.id, {
      type: "SingleVariableDeclaration",
      declaration,
      kind: node.kind,
      start: node.start,
      end: node.end,
      loc: node.loc,
    });
    return declaration.id;
  });
}
