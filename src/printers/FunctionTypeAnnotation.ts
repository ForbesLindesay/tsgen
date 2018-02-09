import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printFunctionTypeAnnotation(
  node: bt.FunctionTypeAnnotation,
  ctx: Context,
): string {
  const typeParameters = node.typeParameters
    ? print(node.typeParameters, ctx)
    : '';
  const params = node.params
    .map(p => {
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
  if (!node.returnType) {
    throw ctx.getError(
      'This function is exported, so it needs a return type.',
      node,
    );
  }
  const returnType = print(node.returnType, ctx);
  return `${typeParameters}(${params}) => ${returnType};`;
}
