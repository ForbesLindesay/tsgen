import * as bt from 'babel-types';
import Context from '../Context';
import print from './';
import {printFunctionTypeAnnotationParams} from './FunctionTypeAnnotation';

export default function printObjectTypeProperty(
  node: bt.ObjectTypeProperty,
  ctx: Context,
): string {
  const staticMarker = (node as any).static ? 'static ' : '';
  const optionalMarker = (node as any).optional ? '?' : '';
  if (bt.isStringLiteral(node.key)) {
    return `${staticMarker}${JSON.stringify(
      node.key.value,
    )}${optionalMarker}: ${print(node.value, ctx)};`;
  }
  if (bt.isIdentifier(node.key)) {
    if (
      node.key.name === 'constructor' &&
      !staticMarker &&
      !optionalMarker &&
      bt.isFunctionTypeAnnotation(node.value) &&
      (!node.value.typeParameters ||
        node.value.typeParameters.params.length === 0)
    ) {
      return `${node.key.name}(${printFunctionTypeAnnotationParams(
        node.value,
        ctx,
      )})`;
    }
    return `${staticMarker}${node.key.name}${optionalMarker}: ${print(
      node.value,
      ctx,
    )};`;
  }
  throw ctx.getError(
    'Expected the key of this type property to be an Identifier or a StringLiteral.',
    node,
  );
}
