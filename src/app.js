const path = require('path')
const express = require('express')
// loading the express library
// express is a function. you call express to create new application 
// imagine we own this domain 
// app.com //home page one domain with multiple routs
// app.com/help
// app.com/about
// console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, '../public'));
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// setting up the server
// the get() takes two argu.. the first is the rout "app.com"
// second argu... function. this function will send back
app.get('', (req, res) => {
  // res.send('Hello express app.js')
  // the send () allow is to send back the message.
  res.send('<h1>Hello express app.js</h1>')
})

// // ADDING THE HELP ROUT
// app.get('/help', (req, res) => {
//   // res.send('Help page app.js')
//   // res.send({
//   //   name: 'Rashed'
//   // })

//   res.send([{
//     name: 'Rashed'
//   },
//   {
//     name: 'Andrew'
//   }
//   ])
// })
// // adding the about rout
// app.get('/about', (req, res) => {
//   // res.send('About the page app.js')
//   res.send('<h1>About the page app.js</h1>')
// })

// adding the weather rout
app.get('/weather', (req, res) => {
  // res.send('Weather: app.js')
  res.send({
    forecast: 'It is rainning',
    location: 'Malmo'
  })
})




const PORT = 3000
// setting up the server
app.listen(PORT, () => {
  console.log('server is up on port ' + PORT)
})