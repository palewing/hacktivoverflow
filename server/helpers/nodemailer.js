const nodemailer = require('nodemailer')

module.exports = (to, text) => {
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Hacktiv Overflow | PENTING!!!!',
        html: text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
} 