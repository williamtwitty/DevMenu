module.exports={
  
         checkByTable: [],
         code : '',
         input: '',
         coup: false,
         email: '',
   
     
   
   
   
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
     alert("You have entered an invalid email address!")  
     return (false)  
   },
   
  

 }