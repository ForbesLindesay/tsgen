import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printObjectProperty(node: bt.ObjectProperty, ctx: Context): string {
  if (node.shorthand) {
    return print(node.key, ctx);
  }
  if (node.computed) {
    return `[${print(node.key, ctx)}]: ${print(node.value, ctx)}`;
  }
  if (bt.isStringLiteral(node.key)) {
    return `${JSON.stringify(node.key.value)}: ${print(node.value, ctx)},`;
  }
  if (bt.isIdentifier(node.key)) {
    return `${node.key.name}: ${print(node.value, ctx)},`;
  }
  throw ctx.getError('Expected the key of this property to be an Identifier or a StringLiteral.', node);
}
