const router = require('express').Router();
const authen = require('../middlewares/authen');
const answerAuthor = require('../middlewares/answerAuthor');
const AnswerController = require('../controllers/answerController');

router.post('/:id', authen, AnswerController.create)
router.patch('/:id', authen, answerAuthor, AnswerController.updateAnswer)


module.exports = router