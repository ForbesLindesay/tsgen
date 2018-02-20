import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printUnionTypeAnnotation(
  node: bt.UnionTypeAnnotation,
  ctx: Context,
): string {
  return node.types
    .map(t => {
      if (bt.isFunctionTypeAnnotation(t)) {
        return `(${print(t, ctx)})`;
      }
      return print(t, ctx);
    })
    .join(' | ');
}
