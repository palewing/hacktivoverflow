const router = require('express').Router()
const QuestionRouter = require('../routes/questionRoute')
const AnswerRouter = require('../routes/answerRoute')
const UserController = require('../controllers/userController')

router.get('/', (req, res)=>{
    res.status(200).json('Everything will be fine')
})

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use('/questions', QuestionRouter);
router.use('/answers', AnswerRouter);

module.exports = router;