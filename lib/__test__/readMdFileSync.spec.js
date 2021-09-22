jest.mock('../readMdFileSync');

describe('holi', () => {
  test('nnnn', () => {
    const readMdFileSync = require('../readMdFileSync');
    expect(readMdFileSync('C:/Users/danie/Documents/md-links/SCL017-md-link/md/file.md').length).toBe(2);
  });
});