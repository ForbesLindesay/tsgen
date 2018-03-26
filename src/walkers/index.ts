import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context from '../Context';
import walkClassDeclaration from './ClassDeclaration';
import walkDeclareClass from './DeclareClass';
import walkDeclareFunction from './DeclareFunction';
import walkDeclareVariable from './DeclareVariable';
import walkExportDefaultDeclaration from './ExportDefaultDeclaration';
import walkExportNamedDeclaration from './ExportNamedDeclaration';
import walkExpressionStatement from './ExpressionStatement';
import walkFunctionDeclaration from './FunctionDeclaration';
import walkIfStatement from './IfStatement';
import walkImportDeclaration from './ImportDeclaration';
import walkInterfaceDeclaration from './InterfaceDeclaration';
import walkTryStatement from './TryStatement';
import walkTypeAlias from './TypeAlias';
import walkVariableDeclaration from './VariableDeclaration';

export default function walk(
  node: bt.Statement,
  ctx: Context,
): bt.Identifier[] {
  switch (node.type) {
    case 'ClassDeclaration':
      return walkClassDeclaration(node as bt.ClassDeclaration, ctx);
    case 'DeclareClass':
      return walkDeclareClass(node as bt.DeclareClass, ctx);
    case 'DeclareFunction':
      return walkDeclareFunction(node as bt.DeclareFunction, ctx);
    case 'DeclareVariable':
      return walkDeclareVariable(node as bt.DeclareVariable, ctx);
    case 'ExportDefaultDeclaration':
      return walkExportDefaultDeclaration(
        node as bt.ExportDefaultDeclaration,
        ctx,
      );
    case 'ExportNamedDeclaration':
      return walkExportNamedDeclaration(node as bt.ExportNamedDeclaration, ctx);
    case 'ExpressionStatement':
      return walkExpressionStatement(node as bt.ExpressionStatement, ctx);
    case 'FunctionDeclaration':
      return walkFunctionDeclaration(node as bt.FunctionDeclaration, ctx);
    case 'IfStatement':
      return walkIfStatement(node as bt.IfStatement, ctx);
    case 'ImportDeclaration':
      return walkImportDeclaration(node as bt.ImportDeclaration, ctx);
    case 'InterfaceDeclaration':
      return walkInterfaceDeclaration(node as bt.InterfaceDeclaration, ctx);
    case 'TryStatement':
      return walkTryStatement(node as bt.TryStatement, ctx);
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
