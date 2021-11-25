const express = require('express')
// loading the express library
// express is a function. you call express to create new application 
// imagine we own this domain 
// app.com //home page one domain with multiple routs
// app.com/help
// app.com/about
const app = express()

// setting up the server
// the get() takes two argu.. the first is the rout "app.com"
// second argu... function. this function will send back
app.get('', (req, res) => {
  res.send('Hello express app.js')
  // the send () allow is to send back the message.
})

// ADDING THE HELP ROUT
app.get('/help', (req, res) => {
  res.send('Help page app.js')
})
// adding the about rout
app.get('/about', (req, res) => {
  res.send('About the page app.js')
})

// adding the weather rout
app.get('/weather', (req, res) => {
  res.send('Weather: app.js')
})




const PORT = 3000
// setting up the server
app.listen(PORT, () => {
  console.log('server is up on port ' + PORT)
})