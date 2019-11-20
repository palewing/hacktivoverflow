const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
    desc:{
        type: String,
        required: [true, 'Please write down your answer']
    },
    upvotes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `Answer creator cannot be null`]
    },
    QuestionId:{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, `Question id cannot be null`]
    }
}, {
    timestamps: true,
    versionKey: false
})

const Answer = model('Answer', answerSchema)

module.exports = Answer