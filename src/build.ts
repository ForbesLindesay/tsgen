import {readdirSync, readFileSync, writeFileSync} from 'fs';

function write(filename: string, str: string) {
  let old = null;
  try {
    old = readFileSync(filename, 'utf8');
  } catch (ex) {
    if (ex.code !== 'ENOENT') {
      throw ex;
    }
  }
  if (old !== str) {
    writeFileSync(filename, str);
  }
}

const builders = readdirSync(__dirname + '/walkers')
  .filter(filename => filename !== 'index.ts')
  .map(filename => filename.replace(/\.ts$/, ''));

write(
  __dirname + '/walkers/index.ts',
  `
import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context from '../Context';
${builders.map(n => `import walk${n} from './${n}';`).join('\n')}

export default function walk(node: bt.Statement, ctx: Context): bt.Identifier[] {
  switch (node.type) {
${builders
    .map(n => `    case '${n}': return walk${n}(node as bt.${n}, ctx);`)
    .join('\n')}
    default:
      writeFileSync(
        __dirname + '/' + node.type + '.ts',
        "import * as bt from 'babel-types';\\n" +
        "import Context from '../Context';\\n\\n" +
        "export default function walk" + node.type + "(node: bt." + node.type + ", ctx: Context): bt.Identifier[] {\\n" +
        "  throw ctx.getError('Unsupported type " + node.type + "', node);\\n" +
        "}\\n",
      );
      throw ctx.getError('Unsupported node type', node);
  }
}
`,
);

const printers = readdirSync(__dirname + '/printers')
  .filter(filename => filename !== 'index.ts')
  .map(filename => filename.replace(/\.ts$/, ''));

function special(n: string): boolean {
  return n === 'SingleImportDeclaration' || n === 'SingleVariableDeclaration';
}

write(
  __dirname + '/printers/index.ts',
  `
import {writeFileSync} from 'fs';
import * as bt from 'babel-types';
import Context, {SingleImportDeclaration, SingleVariableDeclaration} from '../Context';
${printers.map(n => `import print${n} from './${n}';`).join('\n')}

export default function print(node: bt.Node, ctx: Context): string {
  switch (node.type) {
${printers
    .map(
      n =>
        `    case '${n}': return print${n}(node as ${
          special(n) ? '' : 'bt.'
        }${n}, ctx);`,
    )
    .join('\n')}
    default:
      writeFileSync(
        __dirname + '/' + node.type + '.ts',
        "import * as bt from 'babel-types';\\n" +
        "import Context from '../Context';\\n" +
        "import print from './';\\n\\n" +
        "export default function print" + node.type + "(node: bt." + node.type + ", ctx: Context): string {\\n" +
        "  throw ctx.getError('Unsupported type " + node.type + "', node);\\n" +
        "}\\n",
      );
      throw ctx.getError('Unsupported node type', <bt.Node>node);
  }
}
`,
);
