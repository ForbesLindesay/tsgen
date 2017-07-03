import {readFileSync, writeFileSync} from 'fs';
import {parse} from 'babylon';
import {lsrSync} from 'lsr';
import {isMatch} from 'micromatch';
import {format} from 'prettier';
import Context from './Context';
import walk from './walkers';

export function convertFile(filename: string) {
  const src = readFileSync(filename, 'utf8');
  const ast = parse(src, {
    sourceType: 'module',
    sourceFilename: filename,
    plugins: [
      'jsx',
      'flow',
      'classConstructorCall',
      'doExpressions',
      'objectRestSpread',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'dynamicImport',
    ],
  });
  const ctx = new Context(filename, src);
  ast.program.body.map(statement => walk(statement, ctx));


  return format(
    ctx.output.toString(),
    {
      singleQuote: true,
      trailingComma: 'all',
      parser: 'typescript',
      filepath: filename.replace(/.js(.flow)?$/, '\.d\.ts'),
    },
  );
}

export function convertDirectory(dirname: string, patterns: string[], ignorePatterns: string[] = []) {
  lsrSync(process.cwd()).forEach(entry => {
    if (entry.isFile() && patterns.some(p => isMatch(entry.path.substr(2), p)) && !ignorePatterns.some(p => isMatch(entry.path.substr(2), p))) {
      const result = convertFile(entry.fullPath);
      writeFileSync(entry.fullPath.replace(/.js(.flow)?$/, '\.d\.ts'), result);
    }
  });
}
