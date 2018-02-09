#! /usr/bin/env node

import {convertDirectory} from './';

let commonJsDefaultExport = false;
const patterns = [];
const ignorePatterns = [];
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--common-js-default-export') {
    commonJsDefaultExport = true;
  } else if (process.argv[i] === '--ignore') {
    i++;
    ignorePatterns.push(process.argv[i]);
  } else {
    patterns.push(process.argv[i]);
  }
}
convertDirectory(process.cwd(), patterns, ignorePatterns, {
  commonJsDefaultExport,
});
