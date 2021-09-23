const {
  isFileOrDirectory,
  checkIsMdFile,
  getLinksMdFile,
  statsMdLinks,
  validateMdLinkAsync,
  responseHttpRequestAsync,
  validateMdLinksArray,
  statsAndValidateLinks,
} = require('../lib/package-functions');

describe('is a markdown file?', () => {
  it('should be a markdown file', () => {
    expect.assertions(1);
    expect(checkIsMdFile('../md/file.md')).toBe(true);
  });
  it('should not be a markdown file', () => {
    expect.assertions(1);
    expect(checkIsMdFile('../md/text.txt')).toBe(false);
  });
});

describe('returns an array with information about the links found', () => {
  const mdfile = {
    file: '../md/TEST.md',
    data: `# Dillinger
    ## _The Last Markdown Editor, Ever_
    
    [![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)
    
    [[Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](http://travis-ci.org/joemccann/dillinger)
    
    Read and analyze the JavaScript API section of the project described in README.md

    -[Breakdancegalletagalletagalletagalletagalletagalletagalletagalleta](https://breakdance.github.io/breakdance/) - HTML
    
    - Get the extension of a given file by giving the relative path of the file as a parameter.
    -Use the same txt extension document used previously to read its contents.
    -Attempt to get the extension of a file that is outside the root directory.`,
  };
  it('should return an array with the links found', () => {
    expect.assertions(1);
    expect(getLinksMdFile(mdfile)).toBeInstanceOf(Array);
  });
  it('array length should be 3', () => {
    expect.assertions(1);
    expect(getLinksMdFile(mdfile)).toHaveLength(3);
  });
});

describe('returns an object with the total number of links and the number of unique links', () => {
  const mdLinksArray = [{
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
    text: 'Node.js',
    href: 'https://nodejs.org',
    line: 2,
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: '[Build Status',
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    line: 6,
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
    text: 'miaumiau',
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    line: 4,
  },
  ];
  it('should be a object with total links and uniques links', () => {
    expect.assertions(1);
    expect(statsMdLinks(mdLinksArray)).toBeInstanceOf(Object);
  });
  it('should return that a unique link exists', () => {
    expect.assertions(1);
    expect(statsMdLinks(mdLinksArray).unique).toBe(1);
  });
});

describe('return an object with HTTP response code information from the link', () => {
  const linkValidate = {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
    text: 'Node.js',
    href: 'https://nodejs.org',
    line: 2,
  };

  it('should be an object with link information', () => {
    expect.assertions(1);
    return validateMdLinkAsync(linkValidate).then((data) => expect(data).toBeInstanceOf(Object));
  });
});

describe('returns an object with the HTTP response code', () => {
  it('should be HTTP response code information redirect successful', () => {
    expect.assertions(1);
    return expect(responseHttpRequestAsync('https', 'https://breakdance.github.io/breakdance')).resolves.toStrictEqual({
      status: 301,
      message: 'ok',
      statusMessage: 'Moved Permanently',
      redirect: 'yes',
      hrefRedirect: 'https://breakdance.github.io/breakdance/',
    });
  });

  it('should be an object with failed HTTP response code information', () => {
    expect.assertions(1);
    return expect(responseHttpRequestAsync('https', 'https://www.lego.com/en-us/notfound')).resolves.toStrictEqual({
      status: 404,
      message: 'fail',
      statusMessage: 'Not Found',
    });
  });
  it('should be an object with error information', () => {
    expect.assertions(1);
    return expect(responseHttpRequestAsync('https', 'https://breakdance.github/')).resolves.toStrictEqual({
      status: 404,
      message: 'fail',
      statusMessage: 'ENOTFOUND',
    });
  });

  it('should be HTTP response code information redirect successful with url http', () => {
    expect.assertions(1);
    return expect(responseHttpRequestAsync('http', 'http://hazgrandestuscomidas.com/blog/como-')).resolves.toStrictEqual({
      status: 301,
      message: 'ok',
      statusMessage: 'Moved Permanently',
      redirect: 'yes',
      hrefRedirect: 'http://hazgrandestuscomidas.com/blog/como-cocinar-los-fideos-de-arroz/',
    });
  });
  it('should be HTTP response code information redirect successful with url https', () => {
    expect.assertions(1);
    return expect(responseHttpRequestAsync('https', 'https://nodejs.org/')).resolves.toStrictEqual({
      status: 302,
      message: 'ok',
      statusMessage: 'Moved Temporarily',
      redirect: 'yes',
      hrefRedirect: 'https://nodejs.org/en/',
    });
  });
});
describe('is path is directory or file?', () => {
  it('should be true', () => {
    expect.assertions(1);
    expect(isFileOrDirectory('./md')).toBe(true);
  });
  it('should return an error message', () => {
    expect.assertions(1);
    expect(isFileOrDirectory('../md')).toMatch(`Error type:ENOENT: no such file or directory, stat '../md'`);
  });
});
describe('the function returns an array with statistics of validated links', () => {
  const mdLinksArray = [{
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: 'express',
    href: 'http://expressjs.com',
    line: 183,
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: 'AngularJS',
    href: 'http://angularjs.org',
    line: 184,
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: 'Gulp',
    href: 'https://gulpjs.com',
    line: 185,
  },
  ];
  it('should be an array of objects with information about each link found', () => {
    expect.assertions(1);
    return expect(validateMdLinksArray(mdLinksArray)).resolves.toBeInstanceOf(Array);
  });
});
describe('returns an object with statistics of the links', () => {
  const mdLinksArray = [{
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: '![N|Solid',
    href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
    line: 4,
    status: 200,
    message: 'ok',
    statusMessage: 'OK',
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: '[Build Status',
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    line: 6,
    status: 301,
    message: 'ok',
    statusMessage: 'Moved Permanently',
    redirect: 'yes',
    hrefRedirect: 'https://api.travis-ci.org/joemccann/dillinger.svg?branch=master',
  },
  {
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    text: 'Breakdancegalletagalletagalletagalletagalletagalle',
    href: 'https://breakdance.github.io/breakdance/',
    line: 50,
    status: 200,
    message: 'ok',
    statusMessage: 'OK',
  },
  ];
  it('should be a object', () => {
    expect.assertions(1);
    return statsAndValidateLinks(mdLinksArray, {
      total: 16,
      unique: 1,
    }).then((data) => expect(data).toBeInstanceOf(Object));
  });
});
