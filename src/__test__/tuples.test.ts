import '../build';
import {lsrSync} from 'lsr';
import {convertFile} from '../';

lsrSync(__dirname + '/tuples').forEach(entry => {
  if (/\.js\.flow$/.test(entry.path)) {
    test(entry.path, () => {
      expect(convertFile(entry.fullPath)).toMatchSnapshot();
    });
  }
});
