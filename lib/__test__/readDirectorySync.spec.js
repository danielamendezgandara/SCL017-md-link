const readDirectorySync = require('../readDirectorySync');

jest.mock('../readDirectorySync');

describe('read a directory, search for md files and capture the links', () => {
  const fileSummary = readDirectorySync('../files_md_test');
  it('should return an array of objects from each link found in the md files in the directory', () => {
    expect.assertions(1);
    expect(fileSummary).toBeInstanceOf(Array);
  });

  it('the array of objects must have a length of 3', () => {
    expect.assertions(1);
    expect(fileSummary).toHaveLength(4);
  });
  it('should be an array with information from two md files containing the same links', () => {
    expect.assertions(1);
    expect(fileSummary).toStrictEqual([
      {
        file: '../files_md_test/file1.md',
        text: '![N|Solid',
        href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
        line: 4,
      },
      {
        file: '../files_md_test/file1.md',
        text: '[Build Status',
        href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
        line: 6,
      },
      {
        file: '../files_md_test/file2.md',
        text: '![N|Solid',
        href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
        line: 4,
      },
      {
        file: '../files_md_test/file2.md',
        text: '[Build Status',
        href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
        line: 6,
      },
    ]);
  });
});
