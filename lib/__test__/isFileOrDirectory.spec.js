const isFileOrDirectory = require('../isFileOrDirectory');

jest.mock('../isFileOrDirectory');

describe('is path is directory or file?', () => {
  it('should be a directory', () => {
    expect.assertions(1);
    expect(isFileOrDirectory('C:/Users/danie/Documents/md-links/SCL017-md-link/md')).toBe(true);
  });
});
