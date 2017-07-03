import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectExpression(node: bt.ObjectExpression, ctx: Context): string {
  return `{${node.properties.map(p => print(p, ctx)).join('\n')}}`;
}
