import '../build';
import {lsrSync} from 'lsr';
import {convertFile} from '../';

lsrSync(__dirname + '/polished').forEach(entry => {
  if (/\.js\.flow$/.test(entry.path) && !/internalHelpers/.test(entry.path)) {
    test(entry.path, () => {
      expect(convertFile(entry.fullPath)).toMatchSnapshot();
    });
  }
});