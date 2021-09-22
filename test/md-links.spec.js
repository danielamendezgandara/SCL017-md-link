/*const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/

//const {checkIsMdFile,getLinksMdFile} = require('../lib/package-functions');

describe('is a markdown file?',()=>{
  const {checkIsMdFile} = require('../lib/package-functions');
  test('should be a markdown file',()=>{
    expect(checkIsMdFile('../md/file.md')).toBe(true);
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
      
      - Get the extension of a given file by giving the relative path of the file as a parameter.
      -Use the same txt extension document used previously to read its contents.
      -Attempt to get the extension of a file that is outside the root directory.`,
  }
  
  test('should return an array with the links found',()=>{
    const {getLinksMdFile}= require('../lib/package-functions');
    expect(getLinksMdFile(mdfile).length).toBe(2);
    expect(getLinksMdFile(mdfile)).toBeInstanceOf(Array);
  })
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



test('mock implementation of basic function',()=>{
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
  expect(pizza.name('Cheese')).toBe('Pizza name : Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
})