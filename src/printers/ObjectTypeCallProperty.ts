import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectTypeCallProperty(
  node: bt.ObjectTypeCallProperty,
  ctx: Context,
): string {
  const value = node.value;
  if (!bt.isFunctionTypeAnnotation(value)) {
    throw ctx.getError('Expected function type annotation', value);
  }
  const typeParameters = value.typeParameters
    ? print(value.typeParameters, ctx)
    : '';
  const params = value.params
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
      value.rest
        ? [`...${value.rest.name}: ${print(value.rest.typeAnnotation, ctx)}`]
        : [],
    )
    .join(', ');
  if (!value.returnType) {
    throw ctx.getError(
      'This function is exported, so it needs a return type.',
      node,
    );
  }
  const returnType = print(value.returnType, ctx);
  return `${typeParameters}(${params}): ${returnType}`;
}
