const path = require('path')
const express = require('express')
console.log(path.join(__dirname, '../public'));
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

// the main domain or the root
app.get('', (req, res) => {
  // res.send()we use in hbs render()
  // res.render('index')
  // so by calling render, express() goes and gets the view and converts it to html and makes to get an html back to the requester
  // render takes two argu.. they must match index must be as index in views folder
  res.render('index', {
    title: 'Weather app',
    name: 'Rashed'
  })
})

// app.com/about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Rashed'
  })

})
// app.com/help
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text to the screen'
  })
})


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