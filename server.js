let express = require('express')
let api_routes = require('./routes/api.js')
let path = require('path')
const app = express()

let vueClientPath = path.join(__dirname, 'student-sign-in', 'dist')
console.log('path: ', vueClientPath)

let vueApp = express.static(vueClientPath)
app.use ('/', vueApp)
// in video this was done a little differently
// app.use(express.static(vueClientPath))
// why is the slash needed in the above line but not when the commands are compressed? 

app.use(express.json())
// makes app aware that there can be json data, convert to javascript

// enable app to respond to requests from routes
app.use('/api', api_routes)

// error handling - return a message for any other requests
app.use(function(req, res, next) {
    res.status(404).send('Not found (reported from server.js).')
})

app.use(function(err, res, req, next) {
    console.error(err.stack)
    res.status(500).send('Server error (reported from server.js).')
})

let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})
