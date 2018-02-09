import '../build';
import {lsrSync} from 'lsr';
import {convertFile} from '../';

lsrSync(__dirname + '/common-js-default-export').forEach(entry => {
  if (/\.js\.flow$/.test(entry.path)) {
    test(entry.path, () => {
      expect(
        convertFile(entry.fullPath, {commonJsDefaultExport: true}),
      ).toMatchSnapshot();
    });
  }
});
