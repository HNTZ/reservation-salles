const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

// Routes
const roomsRoute = require('./routes/rooms')

app.use('/rooms', roomsRoute)

// Handlebars templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body parser
app.use(express.urlencoded({extended: false}))

// Page d'accueil
app.get('/', (req, res) => {
    res.send('Hello world');
})

const PORT = 3000
app.listen(PORT, () => console.log('server running on port ' + PORT)) 