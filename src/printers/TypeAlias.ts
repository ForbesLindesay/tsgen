import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

export default function printTypeAlias(node: bt.TypeAlias, ctx: Context): string {
  const typeParameters = node.typeParameters ? print(node.typeParameters, ctx) : '';
  if (bt.isObjectTypeAnnotation(node.right)) {
    return `
      declare interface ${node.id.name}${typeParameters} ${print(node.right, ctx)};
      ${!ctx.exportNames.has(node.id.name) ? `export {${node.id.name}};` : ''}
    `.trim();
  }
  return `${!ctx.exportNames.has(node.id.name) ? `export  ` : ''}type ${node.id.name}${typeParameters} = ${print(node.right, ctx)}`;
}
