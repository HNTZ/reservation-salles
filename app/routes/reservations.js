const express = require('express')
const router = express.Router()

const Reservations = require("../models/Reservations")

router.get("/", (req, res) => {
    res.render('reservations', {reservations: req.session.bookings})
})

router.post('/:id', (req, res) => {
    Reservations.deleteOne({_id: req.params.id}).then(() => {
        req.session.bookings = req.session.bookings.filter(res => res._id == req.params.id)
        res.redirect('/reservations')
    })
})

module.exports = router