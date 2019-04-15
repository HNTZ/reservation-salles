const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    date: Date,
    partOfDay: String
})

module.exports = mongoose.model('reservations', reservationSchema)