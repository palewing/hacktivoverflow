const router = require('express').Router();
const authen = require('../middlewares/authen');
const answerAuthor = require('../middlewares/answerAuthor');
const AnswerController = require('../controllers/answerController');

router.post('/:id', authen, AnswerController.create)

router.patch('/:id/upvote', authen, AnswerController.upvote)
router.patch('/:id/downvote', authen, AnswerController.downvote)

router.patch('/:id', authen, answerAuthor, AnswerController.updateAnswer)
router.delete('/:id', authen, answerAuthor, AnswerController.deleteAnswer)


module.exports = router