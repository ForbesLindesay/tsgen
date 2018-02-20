import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printInterfaceDeclaration(
  node: bt.InterfaceDeclaration,
  ctx: Context,
): string {
  const name = node.id.name;
  const typeParameters = node.typeParameters
    ? print(node.typeParameters, ctx)
    : '';
  return `declare interface ${name}${typeParameters} ${print(node.body, ctx)}`;
}
