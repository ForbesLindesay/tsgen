import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectTypeIndexer(
  node: bt.ObjectTypeIndexer,
  ctx: Context,
): string {
  if ((node as any).static) {
    throw ctx.getError(
      '"static" ObjectTypeIndexer is not supported by tsgen',
      node,
    );
  }
  const {id, key, value} = node;
  if (!bt.isIdentifier(id)) {
    throw ctx.getError('Expeced identifier', id);
  }
  return `[${id.name}: ${print(key, ctx)}]: ${print(value, ctx)}`;
}
