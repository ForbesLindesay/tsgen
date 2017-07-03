import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

// LVal = Identifier | MemberExpression | RestElement | AssignmentPattern | ArrayPattern | ObjectPattern;
function isOptional(node: bt.LVal): boolean {
  if (bt.isAssignmentPattern(node)) {
    return true;
  }
  return !!((node as any).optional);
}

function printTypeAnnotation(node: bt.LVal, ctx: Context): string {
  if (!(node as any).typeAnnotation) {
    throw ctx.getError('This function is exported, so it needs a type annotation', node);
  }
  return print((node as any).typeAnnotation, ctx);
}

function printProperty(p: bt.AssignmentProperty | bt.RestProperty, ctx: Context): string {
  if (p.type === 'ObjectProperty') {
    const a: bt.AssignmentProperty = p;
    if (!bt.isIdentifier(a.key)) {
      throw ctx.getError('Expected properties of ObjectExpression to be identifiers or rest elmenets', p);
    }
    return a.key.name;
}
  if (!bt.isIdentifier(p.argument)) {
    throw ctx.getError('Expected rest element to be an identifier', p);
  }
  return `...${p.argument.name}`;
}

function printParam(p: bt.LVal, isOptional: boolean, ctx: Context): string {
  const optional = isOptional ? '?' : '';
  if (bt.isIdentifier(p)) {
    return p.name + optional + ': ' + printTypeAnnotation(p, ctx);
  }
  if (bt.isAssignmentPattern(p)) {
    return printParam(p.left, isOptional, ctx);
  }
  if (bt.isRestElement(p)) {
    if (!bt.isIdentifier(p.argument)) {
      throw ctx.getError('Expected rest param to be an identifier', p);
    }
    return `...${p.argument.name}: ${printTypeAnnotation(p, ctx)}`;
  }
  if (bt.isObjectPattern(p)) {
    return `{${p.properties.map(p => printProperty(p, ctx)).join(', ')}}${optional}: ${printTypeAnnotation(p, ctx)}`;
  }
  throw ctx.getError('Unsupported arg type ' + p.type, p);
}

export function printParams(params: Array<bt.LVal>, ctx: Context): string {
  return params.map((p, i): string => {
    return printParam(p, params.slice(i).every(isOptional), ctx);
  }).join(',');
}
export default function printFunctionDeclaration(node: bt.FunctionDeclaration, ctx: Context): string {
  if (!node.id) {
    throw ctx.getError('This function does not have an id.', node);
  }
  const name = node.id.name;
  const typeParameters = node.typeParameters ? print(node.typeParameters, ctx) : '';
  const params = printParams(node.params, ctx);
  if (!node.returnType) {
    throw ctx.getError('This function is exported, so it needs a return type.', node);
  }
  const returnType = print(node.returnType, ctx);
  return `declare function ${name}${typeParameters}(${params}): ${returnType};`;
}
