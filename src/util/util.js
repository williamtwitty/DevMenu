module.exports={
  coupon(e, coupon){
     if(e === coupon){
         return true
         }
      else {
         // alert ('invalid code')
         return false
     }
   },
   validateEmail(mail) {  
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
   {  
     return (true)  
   }  
      
     return (false)  
   },
   
   reduceArr(arr){
     console.log(arr, "arr")
  var bob= arr.reduce((sum, item)=>{
    return sum + (parseFloat (item.price))
   
},0).toFixed(2)
return bob
},

checkArr(arr){
  if(Array.isArray(arr)){
    return true
  }else{
    return false
  }
},

discount(num){
  return (num * .90).toFixed(2)

}
  

 }