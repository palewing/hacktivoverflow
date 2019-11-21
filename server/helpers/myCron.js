const cron = require('node-cron')
const kue = require('kue')
const User = require('../models/user')
const nodemailer = require('../helpers/nodemailer')
const queue = kue.createQueue({
    redis: {
        host: 'localhost',
        port: 6379
    }
});

module.exports = () => {
    cron.schedule('0 14 * * *', () => {
        console.log('running cron');
        User.find()
            .then(users => {
                users.forEach(user => {
                    let text = `Selamat siang, ${user.email}.`

                    let email = user.email
                    queue.create('email', {
                        email,
                        text
                    }).save()
                });
            })
            .catch(err=>{
                throw {
                    status:500,
                    message: 'Background job error'
                }
            });

        queue.process('email', 5, function (job, done) {
            nodemailer(job.data.email, job.data.text)
            done()
        })
    })
} 