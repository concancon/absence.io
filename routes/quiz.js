const router = require('express').Router()// this route is equivalent to "/cart" get method
const quizController = require('../controllers/quizController')

router.get('/', quizController.quiz_list)

router.post('/', quizController.quiz_create_post)

router.post('/:id', (req, res, next) => {
  quizController.quiz_update_post(req, res, next, req.params.id)
})

module.exports = router
