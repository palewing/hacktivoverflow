const Question = require('../models/question')

module.exports = (req, res, next) => {
    Question.findById(req.params.id)
        .then(question => {
            if (question) {
                if (question.UserId == req.user) {
                    next()
                }
                else {
                    let err = { status: 400, message: `Authorization failed` }
                    throw err;
                }
            }
            else {
                let err = { status: 400, message: 'Question not found' }
                throw err;
            }
        })
        .catch(next)
}