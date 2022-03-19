const router = require('express').Router()
const accountController = require('../controllers/accountController')

router.post('/register', accountController.account_create_user)

router.post('/login', accountController.account_login)

router.get('/logout', accountController.account_logout)

module.exports = router
