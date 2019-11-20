const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
    static create(req, res, next) {
        let { desc } = req.body
        let UserId = req.user
        let QuestionId = req.params.id
        Answer.create({ desc, UserId, QuestionId })
            .then(answer => {
                return Question.findByIdAndUpdate(req.params.id, { $push: { answers: answer.id } }, { new: true })
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }
    static updateAnswer(req, res, next){
        let { desc } = req.body
        Answer.findByIdAndUpdate(req.params.id, { $set: { desc } }, {new: true})
        .then(answer=>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
    static upvote(req, res, next){
        Answer.findById(req.params.id)
        .then(answer=>{
            if(answer.upvotes.includes(req.user)){
                let err = {status: 400, message: 'You already upvoted this answer'}
                throw err
            }
            return Answer.findByIdAndUpdate(answer.id, {$pull: {downvotes: req.user} }, {new:true})
        })
        .then(answer=>{
            return Answer.findByIdAndUpdate(answer.id, {$push: {upvotes: req.user} }, {new:true})
        })
        .then(answer=>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
    static downvote(req, res, next){
        Answer.findById(req.params.id)
        .then(answer=>{
            if(answer.downvotes.includes(req.user)){
                let err = {status: 400, message: 'You already downvoted this answer'}
                throw err
            }
            return Answer.findByIdAndUpdate(answer.id, {$pull: {upvotes: req.user} }, {new:true})
        })
        .then(answer=>{
            return Answer.findByIdAndUpdate(answer.id, {$push: {downvotes: req.user} }, {new:true})
        })
        .then(answer=>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
}

module.exports = AnswerController