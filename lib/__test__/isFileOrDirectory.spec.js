//const fs = require('fs');
jest.mock('../isFileOrDirectory');

describe('Is path is directory or file?', () => {
  test('should be a directory', () => {
    const isFileOrDirectory = require('../isFileOrDirectory');
    expect(isFileOrDirectory('C:/Users/danie/Documents/md-links/SCL017-md-link/md')).toBe(true);
  });
});