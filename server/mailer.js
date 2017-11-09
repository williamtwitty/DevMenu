
// app.post('/form/submit', (req, res)=>{
//    let {email, receipt} = req.body
//    req.app.get('db').email_receipt([email, receipt]).then(()=>{
//        var mailOptions = {
//            from: 'fullstackco@gmail.com',
//            to: req.body.email,
//            subject: 'receipt,
//            html: 
//                   <h1>Receipt from Fullstack Co.</h1>
//                   <p></p>
//                   <br/>
//                   <p>Thank you,</p>
//                   <p>Fullstack Co.</p>
//                   <br/>
//                   <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
//                   <p>Copyright © 2017 Fullstack Co., All rights reserved.</p>
                  
//        }
//        transporter.sendMail(mailOptions, function(error, info){
//            if(error){
//                console.log('email error')
//            }
//            else{
//                console.log('email sent' + info.response);
//            }
//        });
//        res.status(200).send('sweet')
//    })
// })
// var transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//        user: 'rachel.noble77@gmail.com',
//        pass: process.env.EMAIL_PASS
//    }
// });

app.post('/api/sendEmail', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rachel.noble77@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    })
    const {email, receipt} = req.body;
    var mailOptions = {
      from: 'fullstackco@gmail.com',
      to: req.body.email,
      subject: receipt,
      html:
            <h1>Receipt from Fullstack Co.</h1>
            <p>{req.body.receipt}</p>
            <br/>
            <p>Thank you,</p>
            <p>Fullstack Co.</p>
            <br/>
            <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
            <p>Copyright © 2017 Fullstack Co., All rights reserved.</p>
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log('message sent!')
      }
    });
  })