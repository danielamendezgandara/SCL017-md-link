/*const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/

//const {checkIsMdFile,getLinksMdFile} = require('../lib/package-functions');

describe('Is a markdown file?',()=>{
  const {checkIsMdFile} = require('../lib/package-functions');
  it('Should be a markdown file',()=>{
    expect(checkIsMdFile('../md/file.md')).toBe(true);
  })
  it('Should not be a markdown file ',()=>{
    expect(checkIsMdFile('../md/text.txt')).toBe(false);
  })
});

describe('Returns an array with information about the links found',()=>{
  const mdfile = {
    file : '../md/TEST.md',
    data :
      `# Dillinger
      ## _The Last Markdown Editor, Ever_
      
      [![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)
      
      [[Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](http://travis-ci.org/joemccann/dillinger)
      
      Read and analyze the JavaScript API section of the project described in README.md

      -[Breakdancegalletagalletagalletagalletagalletagalletagalletagalleta](https://breakdance.github.io/breakdance/) - HTML
      
      - Get the extension of a given file by giving the relative path of the file as a parameter.
      -Use the same txt extension document used previously to read its contents.
      -Attempt to get the extension of a file that is outside the root directory.`,
  }
  const {getLinksMdFile}= require('../lib/package-functions');
  it('Should return an array with the links found',()=>{
    expect(getLinksMdFile(mdfile)).toBeInstanceOf(Array);
  });
  it('Array length should be 3 ',()=>{
    expect(getLinksMdFile(mdfile).length).toBe(3);
  });
});

describe('Returns an object with the total number of links and the number of unique links',()=>{
  const mdLinksArray = [
    {
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
      text: 'Node.js',
      href: 'https://nodejs.org',
      line: 2
    },
    {
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
      text: '[Build Status',
      href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
      line: 6
    },
    {
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
      text: 'miaumiau',
      href: 'https://travis-ci.org/joemccann/dillinger.svg?branch=master',
      line: 4
    },
  ]
  const {statsMdLinks}=require('../lib/package-functions');
  it('Should be a object with total links and uniques links',()=>{
    expect(statsMdLinks(mdLinksArray)).toBeInstanceOf(Object); 
  });
  it('It should return that a unique link exists',()=>{
    expect(statsMdLinks(mdLinksArray).unique).toBe(1);
  });
});

describe('Return an object with HTTP response code information from the link',()=>{
  const linkValidate ={
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/toro.md',
      text: 'Node.js',
      href: 'https://nodejs.org',
      line: 2,
  }
  
  test('Should be an object with link information ',async ()=>{
    const {validateMdLinkAsync} = require('../lib/package-functions');
    const data = await validateMdLinkAsync(linkValidate);
    return expect(data).toBeInstanceOf(Object);
  });
});

describe('Returns an object with the HTTP response code',()=>{
  const {responseHttpRequestAsync}=require('../lib/package-functions');
it('Should be HTTP response code information redirect successful',()=>{
  return expect(responseHttpRequestAsync('https','https://breakdance.github.io/breakdance')).resolves.toEqual({status: 301,
  message: 'ok',
  statusMessage: 'Moved Permanently',
  redirect: 'yes',
  hrefRedirect: 'https://breakdance.github.io/breakdance/'});
});

it('Should be an object with failed HTTP response code information',()=>{
  return expect(responseHttpRequestAsync('https','https://www.lego.com/en-us/notfound')).resolves.toEqual({status: 404,
  message: 'fail',
  statusMessage: 'Not Found'});
});
it('It should be an object with error information',()=>{
  return expect(responseHttpRequestAsync('https','https://breakdance.github/')).resolves.toEqual({status: 404,
  message: 'fail',
  statusMessage: 'ENOTFOUND'});
});

it('Should be HTTP response code information redirect successful with url http',()=>{
  return expect(responseHttpRequestAsync('http','http://hazgrandestuscomidas.com/blog/como-')).resolves.toEqual({status: 301,
  message: 'ok',
  statusMessage: 'Moved Permanently',
  redirect: 'yes',
  hrefRedirect: 'http://hazgrandestuscomidas.com/blog/como-cocinar-los-fideos-de-arroz/'});
});

it('Should be HTTP response code information redirect successful with url https',()=>{
  return expect(responseHttpRequestAsync('https','https://nodejs.org/')).resolves.toEqual({status: 302,
  message: 'ok',
  statusMessage: 'Moved Temporarily',
  redirect: 'yes',
  hrefRedirect: 'https://nodejs.org/en/'});
});

});

describe('Is path is directory or file?',()=>{
  const {isFileOrDirectory}=require('../lib/package-functions');
  it('Should be true', () => {
    expect(isFileOrDirectory('./md')).toBe(true);
  });
  
  it('Should return an error message', () => {
    expect(isFileOrDirectory('../md')).toMatch(`Error type:ENOENT: no such file or directory, stat '../md'`);
  });
});


describe('The function returns an array with statistics of validated links',()=>{
  const mdLinksArray =  
  [
    {
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
  test('It should be an array of objects with information about each link found',()=>{
    const {validateMdLinksArray} = require('../lib/package-functions');
    return expect(validateMdLinksArray(mdLinksArray)).resolves.toBeInstanceOf(Array);
  });

})


describe('Returns an object with statistics of the links',()=>{
  const mdLinksArray = [
    {
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
      text: '![N|Solid',
      href: 'https://cldup.com/dTxpPi9lDf.thumb.png',
      line: 4,
      status: 200,
      message: 'ok',
      statusMessage: 'OK'
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
      hrefRedirect: 'https://api.travis-ci.org/joemccann/dillinger.svg?branch=master'
    },
    {
      file: 'C:/Users/danie/Documents/md-links/SCL017-md-link/md/TEST.md',
      text: 'Breakdancegalletagalletagalletagalletagalletagalle',
      href: 'https://breakdance.github.io/breakdance/',
      line: 50,
      status: 200,
      message: 'ok',
      statusMessage: 'OK'
    }
  ]

  test('Should be a object',()=>{
    const {statsAndValidateLinks}=require('../lib/package-functions');
    return statsAndValidateLinks(mdLinksArray,{total:16,unique:1}).then(data =>expect(data).toBeInstanceOf(Object));

});
});


/*test('mock implementation of basic function',()=>{
   const mock = jest.fn(()=>'I am mock function');
   console.log(mock);
   expect(mock('Calling my mock function')).toBe('I am mock function');
   expect(mock).toHaveBeenCalledWith('Calling my mock function');
});

test('mock return value of a function one time',()=>{
  const mock=jest.fn();
  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('there');
  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
});

test('spying using original implementation',()=>{
  const pizza ={
    name : n => `Pizza name : ${n}`,
  };
  const spy = jest.spyOn(pizza,'name');
  pizza.name('Cheese');
  //expect(pizza.name('Cheese')).toBe('Pizza name : Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
})*/



