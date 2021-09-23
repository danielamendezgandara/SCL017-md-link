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
    href: 'https://nodejs.org',
    text: 'Node.js',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
    line: 2,
  },
  {
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    text: '[Build Status',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    line: 6,
  },
  {
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    text: 'miaumiau',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
    line: 4,
  },
  ];

  const mdLinkUnique = [
    {
      href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
      text: 'miaumiau',
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
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
  it('should be an array of length equal to 1', () => {
    expect.assertions(1);
    expect(statsMdLinks(mdLinkUnique).total).toBe(1);
  });
});

describe('return an object with HTTP response code information from the link', () => {
  const linkValidate = {
    href: 'https://nodejs.org',
    text: 'Node.js',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
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
    href: 'http://expressjs.com',
    text: 'express',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    line: 183,
  },
  {
    href: 'http://angularjs.org',
    text: 'AngularJS',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    line: 184,
  },
  {
    href: 'https://gulpjs.com',
    text: 'Gulp',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
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
    href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
    text: '![N|Solid',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    line: 4,
    status: 200,
    message: 'ok',
    statusMessage: 'OK',
  },
  {
    href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
    text: '[Build Status',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
    line: 6,
    status: 301,
    message: 'ok',
    statusMessage: 'Moved Permanently',
    redirect: 'yes',
    hrefRedirect: 'https://api.travis-ci.org/joemccann/dillinger.svg?branch=master',
  },
  {
    href: 'https://breakdance.github.io/breakdance/',
    text: 'Breakdancegalletagalletagalletagalletagalletagalle',
    file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
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
