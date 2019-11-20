const router = require('express').Router();
const authen = require('../middlewares/authen');
const author = require('../middlewares/author');
const QuestionController = require('../controllers/questionController');

// user don't need authen to see question/answer
router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)

router.post('/', authen, QuestionController.create)
router.patch('/:id/upvote', authen, QuestionController.upvote)
router.patch('/:id/downvote', authen, QuestionController.downvote)

router.delete('/:id', authen, author, QuestionController.deleteQuestion)
router.patch('/:id', authen, author, QuestionController.updateQuestion)

module.exports = router