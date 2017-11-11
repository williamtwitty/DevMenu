
# delete endpoint
delete localhost:3030/api/delete/18/5
##test
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("response must be valid and have a body", function () {
     // assert that the status code is 200
     pm.response.to.be.ok; // info, success, redirection, clientError,  serverError, are other variants
     // assert that the response has a valid JSON body
     pm.response.to.be.withBody;
     pm.response.to.be.json; // this assertion also checks if a body  exists, so the above check is not needed
});


##get menu by type
get localhost:3030/api/desserts

##test
 var response = pm.response.json();
pm.test('server should respond with 200 (ok)', function(){
    pm.response.to.have.status(200);
});

pm.test("4 items are returned", ()=>{
   
    pm.expect(response.length).to.eql(4)
});

##get order by table
get localhost:3030/checkout/1

## test
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("response must be valid and have a body", function () {
     // assert that the status code is 200
     pm.response.to.be.ok; // info, success, redirection, clientError,  serverError, are other variants
     // assert that the response has a valid JSON body
     pm.response.to.be.withBody;
     pm.response.to.be.json; // this assertion also checks if a body  exists, so the above check is not needed
});

## get all orders
get localhost:3030/allorders

##test

 var response = pm.response.json();
 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("response is an array", ()=>{
   
    pm.expect(Array.isArray(response)).to.eql(true)
});

##add new order
post localhost:3030/api/neworder
##test
pm.test("Response time is less than 600ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(600);
});