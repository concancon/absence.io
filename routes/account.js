const router = require('express').Router()// this route is equivalent to "/cart" get method
const accountController = require('../controllers/accountController')

router.post('/register', accountController.account_create_user)

router.post('/login', accountController.account_login)

module.exports = router
