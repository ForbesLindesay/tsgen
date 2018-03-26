import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context, {
  SingleImportDeclaration,
  SingleVariableDeclaration,
} from '../Context';
import printAnyTypeAnnotation from './AnyTypeAnnotation';
import printArrayTypeAnnotation from './ArrayTypeAnnotation';
import printArrowFunctionExpression from './ArrowFunctionExpression';
import printBinaryExpression from './BinaryExpression';
import printBooleanLiteral from './BooleanLiteral';
import printBooleanTypeAnnotation from './BooleanTypeAnnotation';
import printCallExpression from './CallExpression';
import printConditionalExpression from './ConditionalExpression';
import printDeclareClass from './DeclareClass';
import printDeclareFunction from './DeclareFunction';
import printExistentialTypeParam from './ExistentialTypeParam';
import printExportSpecifier from './ExportSpecifier';
import printFunctionDeclaration from './FunctionDeclaration';
import printFunctionExpression from './FunctionExpression';
import printFunctionTypeAnnotation from './FunctionTypeAnnotation';
import printGenericTypeAnnotation from './GenericTypeAnnotation';
import printIdentifier from './Identifier';
import printImportDefaultSpecifier from './ImportDefaultSpecifier';
import printImportSpecifier from './ImportSpecifier';
import printInterfaceDeclaration from './InterfaceDeclaration';
import printIntersectionTypeAnnotation from './IntersectionTypeAnnotation';
import printLogicalExpression from './LogicalExpression';
import printMemberExpression from './MemberExpression';
import printMixedTypeAnnotation from './MixedTypeAnnotation';
import printNullLiteralTypeAnnotation from './NullLiteralTypeAnnotation';
import printNullableTypeAnnotation from './NullableTypeAnnotation';
import printNumberTypeAnnotation from './NumberTypeAnnotation';
import printNumericLiteral from './NumericLiteral';
import printNumericLiteralTypeAnnotation from './NumericLiteralTypeAnnotation';
import printObjectExpression from './ObjectExpression';
import printObjectProperty from './ObjectProperty';
import printObjectTypeAnnotation from './ObjectTypeAnnotation';
import printObjectTypeCallProperty from './ObjectTypeCallProperty';
import printObjectTypeIndexer from './ObjectTypeIndexer';
import printObjectTypeProperty from './ObjectTypeProperty';
import printSingleImportDeclaration from './SingleImportDeclaration';
import printSingleVariableDeclaration from './SingleVariableDeclaration';
import printStringLiteral from './StringLiteral';
import printStringLiteralTypeAnnotation from './StringLiteralTypeAnnotation';
import printStringTypeAnnotation from './StringTypeAnnotation';
import printTemplateLiteral from './TemplateLiteral';
import printTupleTypeAnnotation from './TupleTypeAnnotation';
import printTypeAlias from './TypeAlias';
import printTypeAnnotation from './TypeAnnotation';
import printTypeCastExpression from './TypeCastExpression';
import printTypeParameterInstantiation from './TypeParameterInstantiation';
import printTypeofTypeAnnotation from './TypeofTypeAnnotation';
import printUnionTypeAnnotation from './UnionTypeAnnotation';
import printVoidTypeAnnotation from './VoidTypeAnnotation';

export default function print(node: bt.Node, ctx: Context): string {
  switch (node.type) {
    case 'AnyTypeAnnotation':
      return printAnyTypeAnnotation(node as bt.AnyTypeAnnotation, ctx);
    case 'ArrayTypeAnnotation':
      return printArrayTypeAnnotation(node as bt.ArrayTypeAnnotation, ctx);
    case 'ArrowFunctionExpression':
      return printArrowFunctionExpression(
        node as bt.ArrowFunctionExpression,
        ctx,
      );
    case 'BinaryExpression':
      return printBinaryExpression(node as bt.BinaryExpression, ctx);
    case 'BooleanLiteral':
      return printBooleanLiteral(node as bt.BooleanLiteral, ctx);
    case 'BooleanTypeAnnotation':
      return printBooleanTypeAnnotation(node as bt.BooleanTypeAnnotation, ctx);
    case 'CallExpression':
      return printCallExpression(node as bt.CallExpression, ctx);
    case 'ConditionalExpression':
      return printConditionalExpression(node as bt.ConditionalExpression, ctx);
    case 'DeclareClass':
      return printDeclareClass(node as bt.DeclareClass, ctx);
    case 'DeclareFunction':
      return printDeclareFunction(node as bt.DeclareFunction, ctx);
    case 'ExistentialTypeParam':
      return printExistentialTypeParam(node as bt.ExistentialTypeParam, ctx);
    case 'ExportSpecifier':
      return printExportSpecifier(node as bt.ExportSpecifier, ctx);
    case 'FunctionDeclaration':
      return printFunctionDeclaration(node as bt.FunctionDeclaration, ctx);
    case 'FunctionExpression':
      return printFunctionExpression(node as bt.FunctionExpression, ctx);
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
    case 'InterfaceDeclaration':
      return printInterfaceDeclaration(node as bt.InterfaceDeclaration, ctx);
    case 'IntersectionTypeAnnotation':
      return printIntersectionTypeAnnotation(
        node as bt.IntersectionTypeAnnotation,
        ctx,
      );
    case 'LogicalExpression':
      return printLogicalExpression(node as bt.LogicalExpression, ctx);
    case 'MemberExpression':
      return printMemberExpression(node as bt.MemberExpression, ctx);
    case 'MixedTypeAnnotation':
      return printMixedTypeAnnotation(node as bt.MixedTypeAnnotation, ctx);
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
    case 'NumericLiteralTypeAnnotation':
      return printNumericLiteralTypeAnnotation(
        node as bt.NumericLiteralTypeAnnotation,
        ctx,
      );
    case 'ObjectExpression':
      return printObjectExpression(node as bt.ObjectExpression, ctx);
    case 'ObjectProperty':
      return printObjectProperty(node as bt.ObjectProperty, ctx);
    case 'ObjectTypeAnnotation':
      return printObjectTypeAnnotation(node as bt.ObjectTypeAnnotation, ctx);
    case 'ObjectTypeCallProperty':
      return printObjectTypeCallProperty(
        node as bt.ObjectTypeCallProperty,
        ctx,
      );
    case 'ObjectTypeIndexer':
      return printObjectTypeIndexer(node as bt.ObjectTypeIndexer, ctx);
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
    case 'TemplateLiteral':
      return printTemplateLiteral(node as bt.TemplateLiteral, ctx);
    case 'TupleTypeAnnotation':
      return printTupleTypeAnnotation(node as bt.TupleTypeAnnotation, ctx);
    case 'TypeAlias':
      return printTypeAlias(node as bt.TypeAlias, ctx);
    case 'TypeAnnotation':
      return printTypeAnnotation(node as bt.TypeAnnotation, ctx);
    case 'TypeCastExpression':
      return printTypeCastExpression(node as bt.TypeCastExpression, ctx);
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
