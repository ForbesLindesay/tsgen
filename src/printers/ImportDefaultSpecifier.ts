import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printImportDefaultSpecifier(node: bt.ImportDefaultSpecifier, ctx: Context): string {
  return node.local.name;
}
