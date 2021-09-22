'use strict';
jest.mock('../readDirectorySync');

describe('Read a directory, search for md files and capture the links', () => {
  const readDirectorySync= require('../readDirectorySync');
  const fileSummary =readDirectorySync('../files_md_test');
  it('It should return an array of objects from each link found in the md files in the directory', () => {
    expect(fileSummary).toBeInstanceOf(Array);
  });

  it('The array of objects must have a length of 3', () => {
    expect(fileSummary.length).toBe(4);
  });
  it('It should be an array with information from two md files containing the same links', () => {
    expect(fileSummary).toEqual([
      {
        file: '../files_md_test/file1.md',
        text: '![N|Solid',
        href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
        line: 4
      },
      {
        file: '../files_md_test/file1.md',
        text: '[Build Status',
        href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
        line: 6
      },
      {
        file: '../files_md_test/file2.md',
        text: '![N|Solid',
        href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
        line: 4
      },
      {
        file: '../files_md_test/file2.md',
        text: '[Build Status',
        href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
        line: 6
      }
    ]);
  });
});
  