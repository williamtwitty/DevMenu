const func = require('./util')

describe('Checkout Methods:', function(){
  test('coupon() should return true if DEV is inputed', function(){
   
    

  expect(func.coupon('DEV', 'DEV')).toEqual(true)
  expect(func.coupon('DE', 'DEV')).toEqual(false)
   
  })

  test('validateEmail should return true if email is correct', function(){
   
  expect(func.validateEmail('haley@haley.com')).toEqual(true)
  expect(func.validateEmail('adsf')).toEqual(false)
  })

  test('reduceArr() should sum the prices', function(){
  expect(func.reduceArr([{price: 15.45}, {price: 12.34}, { price: 13.32}])).toEqual("41.11")

  }) 

  test('checkArr() should return true if value is array', function(){
    expect(func.checkArr([{price: 15.45}, {price: 12.34}, { price: 13.32}])).toEqual(true)
    
      }) 

  test('discount() should remove ten percent off the check', function(){
    expect(func.discount(10)).toEqual("9.00")
  })

})