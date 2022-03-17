const router = require('express').Router()
const playController = require('../controllers/playController')

router.get('/:id', (req, res, next) => {
  playController.play_get(req, res, next, req.params.id)
})

router.post('/:id', (req, res, next) => {
  playController.play_post(req, res, next, req.params.id)
})

module.exports = router
