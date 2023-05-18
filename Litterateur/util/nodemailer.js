const nodemailer = require("nodemailer");

const mail = function (email,otp) {
    const transport = nodemailer.createTransport({
        service: process.env.SERVICE_PROVIDER,
        auth: {
          user: process.env.EMAIL_USER,
          pass: "xksu eciy pfwh shkp" || process.env.PASSWORD,
        },
      });
  
      const option = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Litterateur - OTP",
        text: `Welcome Edurite , 
          
                    Here is your OTP for Verifying your account - ${otp}
                    Have Fun, you wordsmith.
                    
                    Thank You `,
      };
  
      transport.sendMail(option, (err, info) => {
        if (err) {
          console.log("Error : ", err);
        } else {
          console.log(`sent OTP to ${email}`);
        }
      });
};

module.exports = { mail };
