const router = require('express').Router()// this route is equivalent to "/cart" get method

router.get('/', (req, res) => {
  res.send('you reached /quiz')
}) // get /quiz

// this route is equivalent to "/cart" post method
router.post('/', (req, res) => { })// logic for adding item to cart});// this route is equivalent to "/cart/:id" delete method

router.delete('/:id', (req, res) => {}) // logic for deleting item from cart});module.exports = router

module.exports = router
