const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('YAHOUUU')
    res.redirect('/')
})

module.exports = router