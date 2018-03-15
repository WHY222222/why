const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');

const nodemailer = require('nodemailer');

let baseUrl = 'https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-02-15&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=SYT&purpose_codes=ADULT';

router.get('/', function(req, res, next){
  console.log(req.body);
  //sendEmail();
  getTrain(req, res, next);
})

function getTrain(req, res, next){

  superagent.get(baseUrl)
    .end(function(err, sres){
      if(err){
        next(err);
      }
      let $ = cheerio.load(sres.text);
      console.log(sres.text);
      //console.log('$', $);
      res.send({
        data: sres.text
      });
    })


}


function sendEmail(){
  console.log('send email');
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.qq.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: '1654729402@qq.com', // generated ethereal user
              pass: 'rutyhsuamtyrbeie'  // generated ethereal password
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Why 👻" <1654729402@qq.com>', // sender address
          to: 'm13120737820@163.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });

}



module.exports = router;
