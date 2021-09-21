/*const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
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