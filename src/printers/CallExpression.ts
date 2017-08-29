import * as path from 'path';
import * as bt from 'babel-types';
import Context from '../Context';
import print from './';

const basename = (filename: string) => {
  while (path.extname(filename) !== '') {
    filename = path.basename(filename, path.extname(filename));
  }

  return filename;
}

export default function printCallExpression(node: bt.CallExpression, ctx: Context): string {
  return basename(ctx.filename);
}
