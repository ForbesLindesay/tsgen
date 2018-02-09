import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectTypeProperty(
  node: bt.ObjectTypeProperty,
  ctx: Context,
): string {
  const optional: boolean = (node as any).optional;
  if (bt.isStringLiteral(node.key)) {
    return `${JSON.stringify(node.key.value)}${optional ? '?' : ''}: ${print(
      node.value,
      ctx,
    )},`;
  }
  if (bt.isIdentifier(node.key)) {
    return `${node.key.name}${optional ? '?' : ''}: ${print(node.value, ctx)},`;
  }
  throw ctx.getError(
    'Expected the key of this type property to be an Identifier or a StringLiteral.',
    node,
  );
}
