const
    express = require('express'),
    app = express(),
    errorHandler = require('./utils/errorHandler'),
    cors = require('cors')

const whitelist = [
    'http://authorized-origin.com'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error(`cors/origin`))
        }
    }
}

// Sets up some routes to play with
app
    .get('/', (req, res, next) => {
        throw new Error(`Oof, I broke...`)
    })
    .post('/', (req, res, next) => {
        res.json({ message: 'No breakage here!'})
    })
    .get('/cors', cors(corsOptions), (req, res, next) => {
        res.json({ message: 'CORS check passed successfully!'})
    })

// NOTE: We apply our errorHandler middleware LAST so that it can catch any bubbling errors
app.use(errorHandler)

// Start up the app
app.listen( 3000, () => console.log(`Let's catch these errors...`))