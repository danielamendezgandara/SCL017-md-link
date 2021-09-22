

/*describe('Is path is directory or file?', () => {
  test('should be a directory', () => {
    const readDirectorySync= require('../isFileOrDirectory');
    expect(readDirectorySync('C:/Users/danie/Documents/md-links/SCL017-md-link/md')).toBe(true);
  });
});*/

'use strict';

//jest.mock('fs');
jest.mock('../readDirectorySync');

describe('listFilesInDirectorySync', () => {
  /*const MOCK_FILE_INFO = {
    'file1.md': 'console.log("file1 contents");',
    'file2.md': 'file2 contents',
  };*/

  /*beforeEach(() => {
    // Set up some mocked out file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });*/

  test('includes all files in the directory in the summary', () => {
    const readDirectorySync= require('../readDirectorySync');
    const fileSummary =readDirectorySync('../files_md_test');

    expect(fileSummary).toBeInstanceOf(Array);
    expect(fileSummary.length).toBe(4);
    //expect(fileSummary.length).toBe(2);
  });
});