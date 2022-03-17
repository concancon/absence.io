const router = require('express').Router()
const quizController = require('../controllers/quizController')

router.get('/', quizController.quiz_list)

router.get('/:id', (req, res, next) => {
  quizController.quiz_detail(req, res, next, req.params.id)
})

router.post('/', quizController.quiz_create_post)

router.post('/:id', (req, res, next) => {
  quizController.quiz_update_post(req, res, next, req.params.id)
})

router.delete('/:id', (req, res, next) => {
  quizController.quiz_delete_get(req, res, next, req.params.id)
})

module.exports = router
