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

})