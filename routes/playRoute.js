const router = require('express').Router()
const playController = require('../controllers/playController')

router.get('/:id', (req, res, next) => {
  playController.play_get(req, res, next, req.params.id)
})

router.get('/', (req, res, next) => {
  playController.play_list(req, res, next)
})

router.post('/:id', (req, res, next) => {
  playController.play_post(req, res, next, req.params.id)
})

module.exports = router
