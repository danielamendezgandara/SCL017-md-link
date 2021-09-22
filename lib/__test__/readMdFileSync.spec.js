jest.mock('../readMdFileSync');

describe('Reads an md file, extracts http or https links and configures information from those links', () => {
  test('It should be an array of length 2', () => {
    const readMdFileSync = require('../readMdFileSync');
    expect(readMdFileSync('C:/Users/danie/Documents/md-links/SCL017-md-link/md/file.md').length).toBe(2);
  });
});