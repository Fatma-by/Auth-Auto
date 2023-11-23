const express = require('express')
const router = express.Router()
router.post('/login',require('../controller/auth.controllers').login    )
router.post('/register', require('../controller/auth.controllers').register)


module.exports = router