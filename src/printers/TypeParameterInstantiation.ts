import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTypeParameterInstantiation(
  node: bt.TypeParameterInstantiation,
  ctx: Context,
): string {
  if (!node.params.length) return '';
  return `<${node.params.map(p => print(p, ctx)).join(',')}>`;
}
