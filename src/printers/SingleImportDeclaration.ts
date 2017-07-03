import * as bt from 'babel-types';
import Context, {SingleImportDeclaration} from '../Context';
import print from './';

export default function printSingleImportDeclaration(node: SingleImportDeclaration, ctx: Context): string {
  return `import ${print(node.specifier, ctx)} from ${print(node.source, ctx)};`;
}
