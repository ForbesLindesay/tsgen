import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectTypeAnnotation(
  node: bt.ObjectTypeAnnotation,
  ctx: Context,
): string {
  return `{
    ${node.properties.map(p => print(p, ctx)).join('\n')}
    ${node.indexers.map(p => print(p, ctx)).join('\n')}
    ${node.callProperties.map(p => print(p, ctx)).join('\n')}
  }`;
}
