const express = require('express')
const router = express.Router()

// Page d'accueil
router.get('/', (req, res) => {
    res.render('index', {title: "Bonjour!", error: req.session.error});
    req.session.error = null
})

module.exports = router