import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export function printFunctionTypeAnnotationParams(
  node: bt.FunctionTypeAnnotation,
  ctx: Context,
) {
  return node.params
    .map(p => {
      if (!p.name) {
        const type = print(p.typeAnnotation, ctx).trim();
        if (/^[A-Za-z0-9]+$/.test(type)) {
          return `${type}: ${type}`;
        }
        throw ctx.getError('Expected parameter to have a name', p);
      }
      return `${p.name.name}${(p as any).optional ? '?' : ''}: ${print(
        p.typeAnnotation,
        ctx,
      )}`;
    })
    .concat(
      node.rest
        ? [`...${node.rest.name}: ${print(node.rest.typeAnnotation, ctx)}`]
        : [],
    )
    .join(', ');
}
export default function printFunctionTypeAnnotation(
  node: bt.FunctionTypeAnnotation,
  ctx: Context,
): string {
  const typeParameters = node.typeParameters
    ? print(node.typeParameters, ctx)
    : '';
  const params = printFunctionTypeAnnotationParams(node, ctx);
  if (!node.returnType) {
    throw ctx.getError(
      'This function is exported, so it needs a return type.',
      node,
    );
  }
  const returnType = print(node.returnType, ctx);
  return `${typeParameters}(${params}) => ${returnType}`;
}
