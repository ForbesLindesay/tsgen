import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTypeofTypeAnnotation(node: bt.TypeofTypeAnnotation, ctx: Context): string {
  const arg = print(node.argument, ctx);
  if (arg === 'undefined') {
    return 'void';
  } else {
    return 'typeof ' + arg;
  }
}
