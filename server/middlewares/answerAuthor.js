const Answer = require('../models/answer')

module.exports = (req, res, next) => {
    Answer.findById(req.params.id)
        .then(answer => {
            if (answer) {
                if (answer.UserId == req.user) {
                    next()
                }
                else {
                    let err = { status: 400, message: `Authorization failed` }
                    throw err;
                }
            }
            else {
                let err = { status: 400, message: 'Answer not found' }
                throw err;
            }
        })
        .catch(next)
}