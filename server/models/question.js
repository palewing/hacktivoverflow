const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Please write a title for the question'],
        maxlength: [140, 'Max length for title is 140 characters']
    },
    desc:{
        type: String,
        required: [true, 'Please write down your question']
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
        required: [true, `Question creator cannot be null`]
    },
    answers:[{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
    }]
}, {
    timestamps: true,
    versionKey: false
})

const Question = model('Question', questionSchema)

module.exports = Question