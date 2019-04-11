const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    seats: Number,
    computers: Number,
    teacherComputer: Boolean,
    airConditioning: Boolean
})

module.exports = mongoose.model('Room', roomSchema)