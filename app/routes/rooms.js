const express = require("express")
const mongoose = require("mongoose")
const filter = require("async/filter")
const moment = require('moment')

const router = express.Router()
const Rooms = require("../models/Rooms")
const Reservations = require("../models/Reservations")

router.get("/", (req, res) => {
  // Get query from url
  let {
    name,
    seats,
    computers,
    teacherComputer,
    airConditioning,
    date,
    partOfDay
  } = req.query

  if (!date || !partOfDay) {
    req.session.error = 'Preciser la date et la tranche horaire'
    res.redirect('/search')
    return
  }
  else if (new Date(date) < new Date()) {
    req.session.error = 'Entrez une date future'
    res.redirect('/search')
    return
  }
  else if (partOfDay !== 'morning' && partOfDay !== 'afternoon') {
    req.session.error = 'Mauvaise tranche horaire'
    res.redirect('/search')
  }

  // construct query for find
  let query = {}
  if (name) query.name = name
  if (seats) query.seats = { $gt: seats }
  if (computers) query.computers = { $gt: computers }
  if (teacherComputer) query.teacherComputer = true
  if (airConditioning) query.airConditioning = true
  
  if (query === {}) {
    res.redirect('back')
  }

  Rooms.find(query, (err, rooms) => {
    if (err) console.log(err)
    filter(
      rooms,
      (room, cb) => {
        Reservations.countDocuments({ room: room._id, date: new Date(date) }, (err, count) => {
          cb(null, !count)
        })
      },
      (err, results) => {
        if (results) {
          res.render("rooms", { rooms: results, date : date, partOfDay })
        } else {
          req.session.error = "Aucune salle correspondant a vos critère n'est disponible."
          res.redirect("/search")
        }
      }
    )
  })
})

router.post("/book", (req, res) => {
  let { room, name, date, partOfDay } = req.body
  let resa = new Reservations({
    _id: mongoose.Types.ObjectId(),
    room,
    date,
    partOfDay
  })
  let resaSession = {
    ...resa._doc,
    date: moment(resa._doc.date).format('DD/MM/YYYY'),
    name,
    partOfDay: partOfDay == 'afternoon' ? 'après-midi' : 'matin'
  }
  if (!req.session.bookings) {
    req.session.bookings = [resaSession]
  }
  else {
    req.session.bookings.push(resaSession)
  }
  resa.save()
    .then(() => {
    })
    .catch(err => console.log(err))
  res.redirect("/reservations")
})

module.exports = router