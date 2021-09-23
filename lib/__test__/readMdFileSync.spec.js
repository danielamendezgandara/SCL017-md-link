const readMdFileSync = require('../readMdFileSync');

jest.mock('../readMdFileSync');

describe('reads an md file, extracts http or https links and configures information from those links', () => {
  it('should be an array of length 2', () => {
    expect.assertions(1);
    expect(readMdFileSync('C:/Users/danie/Documents/md-links/SCL017-md-link/md/file.md')).toHaveLength(2);
  });
});
