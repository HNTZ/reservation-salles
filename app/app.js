const express = require('express')
const path = require('path')
const db = require('./config/db')
const session = require('express-session')

const app = express()

// Body parser
app.use(express.urlencoded({extended: true}))

// Session
app.use(session({secret: 'buu', saveUninitialized: false, resave: false}))

// Routes
const rootRoute = require('./routes/index')
const roomsRoute = require('./routes/rooms')
const reservationsRoute = require('./routes/reservations')
app.use('/', rootRoute)
app.use('/rooms', roomsRoute)
app.use('/reservations', reservationsRoute)

// Handlebars templating
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

const PORT = 3000
app.listen(PORT, () => console.log('server running on port ' + PORT)) 