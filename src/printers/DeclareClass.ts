import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printDeclareClass(
  node: bt.DeclareClass,
  ctx: Context,
): string {
  const name = node.id.name;
  const typeParameters = node.typeParameters
    ? print(node.typeParameters, ctx)
    : '';
  return `declare class ${name}${typeParameters} ${print(node.body, ctx)}`;
}
