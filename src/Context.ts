import codeFrame = require('babel-code-frame');
import * as bt from 'babel-types';
import print from './printers';

const builtins = new Set([
  'Array',
  'Date',
  'Error',
  'Function',
  'Object',
  'Map',
  'Promise',
  'RegExp',
  'Set',
  'undefined',
]);

export interface SingleImportDeclaration extends bt.Node {
  type: 'SingleImportDeclaration';
  specifier:
    | bt.ImportSpecifier
    | bt.ImportDefaultSpecifier
    | bt.ImportNamespaceSpecifier;
  source: bt.StringLiteral;
}
export interface SingleVariableDeclaration extends bt.Node {
  type: 'SingleVariableDeclaration';
  declaration: bt.VariableDeclarator;
  kind: 'var' | 'let' | 'const';
}
export type DeclarationType =
  | bt.FunctionDeclaration
  | SingleImportDeclaration
  | bt.TypeAlias
  | bt.DeclareFunction
  | SingleVariableDeclaration
  | bt.InterfaceDeclaration
  | bt.DeclareClass;

export interface ToStringOptions {
  commonJsDefaultExport?: boolean;
}
export class Output {
  readonly imports: Array<string> = [];
  readonly declarations: Array<string> = [];
  readonly exports: Array<string> = [];
  readonly printed: Set<string> = new Set();

  private readonly ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }
  request(id: bt.Identifier) {
    if (this.printed.has(id.name)) {
      return;
    }
    this.printed.add(id.name);
    const declaration = this.ctx.declarations.get(id.name);
    if (!declaration) {
      if (builtins.has(id.name)) {
        return;
      }
      switch (id.name) {
        case 'tty$ReadStream':
          this.imports.push(
            `import {ReadStream as tty$ReadStream} from 'tty';`,
          );
          return;
        case 'tty$WriteStream':
          this.imports.push(
            `import {WriteStream as tty$WriteStream} from 'tty';`,
          );
          return;
      }
      throw this.ctx.getError(
        'Unable to resolve the reference to ' +
          id.name +
          '. Maybe it should be a builtin?',
        id,
      );
    }
    for (const d of declaration) {
      if (d.type === 'SingleImportDeclaration') {
        this.imports.push(print(d, this.ctx));
      } else {
        this.declarations.push(print(d, this.ctx));
      }
    }
  }
  toString(options: ToStringOptions = {}): string {
    this.ctx.namedExports.forEach(e =>
      this.exports.push(`export ${print(e, this.ctx)};`),
    );
    if (this.ctx.defaultExport) {
      this.exports.push(
        `export ${options.commonJsDefaultExport ? '=' : 'default'} ${print(
          this.ctx.defaultExport,
          this.ctx,
        )};`,
      );
    }
    return (
      this.imports.join('\n') +
      '\n\n' +
      this.declarations.join('\n') +
      '\n\n' +
      this.exports.join('\n') +
      '\n'
    );
  }
}

export class Context {
  readonly filename: string;
  readonly src: string;
  readonly chain: ReadonlyArray<bt.Node>;
  readonly parents: ReadonlyArray<bt.Node>;

  readonly output: Output;

  readonly declarations: Map<string, Array<DeclarationType>> = new Map();

  defaultExport: null | bt.Expression = null;
  readonly namedExports: Array<bt.ExportSpecifier> = [];
  readonly exportNames: Set<string> = new Set();

  constructor(
    filename: string,
    src: string,
    chain: ReadonlyArray<bt.Node> = [],
  ) {
    this.filename = filename;
    this.src = src;
    this.chain = chain;
    this.parents = this.chain.slice(0, this.chain.length - 1).reverse();
    this.output = new Output(this);
  }

  getError(msg: string, node: bt.Node) {
    return new Error(
      msg +
        '\n\n' +
        codeFrame(this.src, node.loc.start.line, node.loc.start.column, {
          highlightCode: true,
        }),
    );
  }

  declare(id: bt.Identifier, declaration: DeclarationType) {
    const d = this.declarations.get(id.name) || [];
    this.declarations.set(id.name, d);
    d.push(declaration);
  }

  setDefaultExport(value: bt.Expression) {
    this.defaultExport = value;
  }

  addNamedExport(value: bt.ExportSpecifier) {
    this.exportNames.add(value.exported.name);
    this.namedExports.push(value);
  }
}

export default Context;
