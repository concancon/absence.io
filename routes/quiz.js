const router = require('express').Router()// this route is equivalent to "/cart" get method

router.get('/', (req, res) => {
  res.send('you reached /quiz')
}) // get /quiz

// this route is equivalent to "/cart" post method
router.post('/', (req, res) => { })// logic for adding quiz});// this route is equivalent to "/cart/:id" delete method

router.delete('/:id', (req, res) => {}) // logic for deleting quiz});module.exports = router

module.exports = router
