const express = require('express')
const router = express.Router()
const moment = require('moment')

const Reservations = require("../models/Reservations")

router.get("/", (req, res) => {
    let upcoming = []
    let past = []
    req.session.bookings && req.session.bookings.map(booking => {
        let tomorrow = moment().add(1, 'days')
        if (moment(booking.date, 'DD/MM/YYYY').isAfter(tomorrow)) {
            upcoming.push(booking)
        } else past.push(booking)
    })
    let empty = upcoming.length == 0 && past.length == 0
    res.render('reservations', {upcomingReservations: upcoming, pastReservations: past, empty})
})

router.post('/:id', (req, res) => {
    Reservations.deleteOne({_id: req.params.id}).then(() => {
        req.session.bookings = req.session.bookings.filter(res => res._id == req.params.id)
        res.redirect('/reservations')
    })
})

module.exports = router