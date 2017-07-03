import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printDeclareFunction(node: bt.DeclareFunction, ctx: Context): string {
  throw ctx.getError('Unsupported type DeclareFunction', node);
}
