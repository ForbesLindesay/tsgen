import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context, {
  SingleImportDeclaration,
  SingleVariableDeclaration,
} from '../Context';
import printAnyTypeAnnotation from './AnyTypeAnnotation';
import printBooleanTypeAnnotation from './BooleanTypeAnnotation';
import printCallExpression from './CallExpression';
import printDeclareFunction from './DeclareFunction';
import printExportSpecifier from './ExportSpecifier';
import printFunctionDeclaration from './FunctionDeclaration';
import printFunctionTypeAnnotation from './FunctionTypeAnnotation';
import printGenericTypeAnnotation from './GenericTypeAnnotation';
import printIdentifier from './Identifier';
import printImportDefaultSpecifier from './ImportDefaultSpecifier';
import printImportSpecifier from './ImportSpecifier';
import printNullLiteralTypeAnnotation from './NullLiteralTypeAnnotation';
import printNullableTypeAnnotation from './NullableTypeAnnotation';
import printNumberTypeAnnotation from './NumberTypeAnnotation';
import printNumericLiteral from './NumericLiteral';
import printObjectExpression from './ObjectExpression';
import printObjectProperty from './ObjectProperty';
import printObjectTypeAnnotation from './ObjectTypeAnnotation';
import printObjectTypeProperty from './ObjectTypeProperty';
import printSingleImportDeclaration from './SingleImportDeclaration';
import printSingleVariableDeclaration from './SingleVariableDeclaration';
import printStringLiteral from './StringLiteral';
import printStringLiteralTypeAnnotation from './StringLiteralTypeAnnotation';
import printStringTypeAnnotation from './StringTypeAnnotation';
import printTupleTypeAnnotation from './TupleTypeAnnotation';
import printTypeAlias from './TypeAlias';
import printTypeAnnotation from './TypeAnnotation';
import printTypeParameterInstantiation from './TypeParameterInstantiation';
import printTypeofTypeAnnotation from './TypeofTypeAnnotation';
import printUnionTypeAnnotation from './UnionTypeAnnotation';
import printVoidTypeAnnotation from './VoidTypeAnnotation';

export default function print(node: bt.Node, ctx: Context): string {
  switch (node.type) {
    case 'AnyTypeAnnotation':
      return printAnyTypeAnnotation(node as bt.AnyTypeAnnotation, ctx);
    case 'BooleanTypeAnnotation':
      return printBooleanTypeAnnotation(node as bt.BooleanTypeAnnotation, ctx);
    case 'CallExpression':
      return printCallExpression(node as bt.CallExpression, ctx);
    case 'DeclareFunction':
      return printDeclareFunction(node as bt.DeclareFunction, ctx);
    case 'ExportSpecifier':
      return printExportSpecifier(node as bt.ExportSpecifier, ctx);
    case 'FunctionDeclaration':
      return printFunctionDeclaration(node as bt.FunctionDeclaration, ctx);
    case 'FunctionTypeAnnotation':
      return printFunctionTypeAnnotation(
        node as bt.FunctionTypeAnnotation,
        ctx,
      );
    case 'GenericTypeAnnotation':
      return printGenericTypeAnnotation(node as bt.GenericTypeAnnotation, ctx);
    case 'Identifier':
      return printIdentifier(node as bt.Identifier, ctx);
    case 'ImportDefaultSpecifier':
      return printImportDefaultSpecifier(
        node as bt.ImportDefaultSpecifier,
        ctx,
      );
    case 'ImportSpecifier':
      return printImportSpecifier(node as bt.ImportSpecifier, ctx);
    case 'NullLiteralTypeAnnotation':
      return printNullLiteralTypeAnnotation(
        node as bt.NullLiteralTypeAnnotation,
        ctx,
      );
    case 'NullableTypeAnnotation':
      return printNullableTypeAnnotation(
        node as bt.NullableTypeAnnotation,
        ctx,
      );
    case 'NumberTypeAnnotation':
      return printNumberTypeAnnotation(node as bt.NumberTypeAnnotation, ctx);
    case 'NumericLiteral':
      return printNumericLiteral(node as bt.NumericLiteral, ctx);
    case 'ObjectExpression':
      return printObjectExpression(node as bt.ObjectExpression, ctx);
    case 'ObjectProperty':
      return printObjectProperty(node as bt.ObjectProperty, ctx);
    case 'ObjectTypeAnnotation':
      return printObjectTypeAnnotation(node as bt.ObjectTypeAnnotation, ctx);
    case 'ObjectTypeProperty':
      return printObjectTypeProperty(node as bt.ObjectTypeProperty, ctx);
    case 'SingleImportDeclaration':
      return printSingleImportDeclaration(node as SingleImportDeclaration, ctx);
    case 'SingleVariableDeclaration':
      return printSingleVariableDeclaration(
        node as SingleVariableDeclaration,
        ctx,
      );
    case 'StringLiteral':
      return printStringLiteral(node as bt.StringLiteral, ctx);
    case 'StringLiteralTypeAnnotation':
      return printStringLiteralTypeAnnotation(
        node as bt.StringLiteralTypeAnnotation,
        ctx,
      );
    case 'StringTypeAnnotation':
      return printStringTypeAnnotation(node as bt.StringTypeAnnotation, ctx);
    case 'TupleTypeAnnotation':
      return printTupleTypeAnnotation(node as bt.TupleTypeAnnotation, ctx);
    case 'TypeAlias':
      return printTypeAlias(node as bt.TypeAlias, ctx);
    case 'TypeAnnotation':
      return printTypeAnnotation(node as bt.TypeAnnotation, ctx);
    case 'TypeParameterInstantiation':
      return printTypeParameterInstantiation(
        node as bt.TypeParameterInstantiation,
        ctx,
      );
    case 'TypeofTypeAnnotation':
      return printTypeofTypeAnnotation(node as bt.TypeofTypeAnnotation, ctx);
    case 'UnionTypeAnnotation':
      return printUnionTypeAnnotation(node as bt.UnionTypeAnnotation, ctx);
    case 'VoidTypeAnnotation':
      return printVoidTypeAnnotation(node as bt.VoidTypeAnnotation, ctx);
    default:
      writeFileSync(
        __dirname + '/' + node.type + '.ts',
        "import * as bt from 'babel-types';\n" +
          "import Context from '../Context';\n" +
          "import print from './';\n\n" +
          'export default function print' +
          node.type +
          '(node: bt.' +
          node.type +
          ', ctx: Context): string {\n' +
          "  throw ctx.getError('Unsupported type " +
          node.type +
          "', node);\n" +
          '}\n',
      );
      throw ctx.getError('Unsupported node type ' + node.type, <bt.Node>node);
  }
}
