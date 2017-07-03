#! /usr/bin/env node

import {convertDirectory} from './';

const patterns = [];
const ignorePatterns = [];
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--ignore') {
    i++;
    ignorePatterns.push(process.argv[i]);
  } else {
    patterns.push(process.argv[i]);
  }
}
convertDirectory(process.cwd(), patterns, ignorePatterns);
