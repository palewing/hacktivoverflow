const Question = require('../models/question');

class QuestionController {
    static create(req, res, next) {
        let { title, desc } = req.body
        let UserId = req.user
        Question.create({ title, desc, UserId })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }
    static getAll(req, res, next) {
        Question.find()
            .populate('UserId', 'email')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Question.findById(req.params.id)
            .populate('answers')
            .populate('UserId', 'email')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static deleteQuestion(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static updateQuestion(req, res, next) {
        let { title, desc } = req.body
        Question.findByIdAndUpdate(req.params.id, { $set: { title, desc } }, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static upvote(req, res, next){
        Question.findById(req.params.id)
        .then(question=>{
            if(question.upvotes.includes(req.user)){
                let err = {status: 400, message: 'You already upvoted this question'}
                throw err
            }
            return Question.findByIdAndUpdate(question.id, {$pull: {downvotes: req.user} }, {new:true})
        })
        .then(question=>{
            return Question.findByIdAndUpdate(question.id, {$push: {upvotes: req.user} }, {new:true})
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }
    static downvote(req, res, next){
        Question.findById(req.params.id)
        .then(question=>{
            if(question.downvotes.includes(req.user)){
                let err = {status: 400, message: 'You already downvoted this question'}
                throw err
            }
            return Question.findByIdAndUpdate(question.id, {$pull: {upvotes: req.user} }, {new:true})
        })
        .then(question=>{
            return Question.findByIdAndUpdate(question.id, {$push: {downvotes: req.user} }, {new:true})
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }
}

module.exports = QuestionController