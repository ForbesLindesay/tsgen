import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTemplateLiteral(
  node: bt.TemplateLiteral,
  ctx: Context,
): string {
  throw ctx.getError('Unsupported type TemplateLiteral', node);
}
