import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printStringLiteralTypeAnnotation(node: bt.StringLiteralTypeAnnotation, ctx: Context): string {
  // unfortunately the type definition file seems to be wrong here
  const value: string = (node as any).value;
  if (typeof value !== 'string') {
    throw ctx.getError('Expected StringLiteralTypeAnnotation.value to be a string.', node);
  }
  return JSON.stringify(value);
}
