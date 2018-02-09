import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context from '../Context';
import walkDeclareFunction from './DeclareFunction';
import walkExportDefaultDeclaration from './ExportDefaultDeclaration';
import walkExportNamedDeclaration from './ExportNamedDeclaration';
import walkFunctionDeclaration from './FunctionDeclaration';
import walkImportDeclaration from './ImportDeclaration';
import walkTypeAlias from './TypeAlias';
import walkVariableDeclaration from './VariableDeclaration';

export default function walk(
  node: bt.Statement,
  ctx: Context,
): bt.Identifier[] {
  switch (node.type) {
    case 'DeclareFunction':
      return walkDeclareFunction(node as bt.DeclareFunction, ctx);
    case 'ExportDefaultDeclaration':
      return walkExportDefaultDeclaration(
        node as bt.ExportDefaultDeclaration,
        ctx,
      );
    case 'ExportNamedDeclaration':
      return walkExportNamedDeclaration(node as bt.ExportNamedDeclaration, ctx);
    case 'FunctionDeclaration':
      return walkFunctionDeclaration(node as bt.FunctionDeclaration, ctx);
    case 'ImportDeclaration':
      return walkImportDeclaration(node as bt.ImportDeclaration, ctx);
    case 'TypeAlias':
      return walkTypeAlias(node as bt.TypeAlias, ctx);
    case 'VariableDeclaration':
      return walkVariableDeclaration(node as bt.VariableDeclaration, ctx);
    default:
      writeFileSync(
        __dirname + '/' + node.type + '.ts',
        "import * as bt from 'babel-types';\n" +
          "import Context from '../Context';\n\n" +
          'export default function walk' +
          node.type +
          '(node: bt.' +
          node.type +
          ', ctx: Context): bt.Identifier[] {\n' +
          "  throw ctx.getError('Unsupported type " +
          node.type +
          "', node);\n" +
          '}\n',
      );
      throw ctx.getError('Unsupported node type ' + node.type, node);
  }
}
