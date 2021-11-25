const path = require('path')
const express = require('express')
console.log(path.join(__dirname, '../public'));
console.log(path.join(__dirname, '../'));
const app = express()

// partials are part of the web page that can be reused multiple times.e.g headers,  footers.... first thing to start loading hbs
const hbs = require('hbs')


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')//changing the default path
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)//using the custom directory path
hbs.registerPartials(partialsPath)
// Remember any changes to the hbs files wont restart the server.
// Run this instead: nodemon .\src\app.js => nodemon .\src\app.js -e js,hbs



// Setup static directory to serve
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
    helpText: 'This is some helpful text to the screen',
    title: 'help app.js ',
    name: 'Rashed'
  })
})


app.get('/weather', (req, res) => {
  // res.send('Weather: app.js')
  res.send({
    forecast: 'It is rainning',
    location: 'Malmo'
  })
})

// 3. about pattern match
app.get('/about/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rashed',
    errorMessage: 'Person not found'
  })
})
// 2. specific pattern match
app.get('/help/*', (req, res) => {
  // res.send('Help article not found')
  res.render('404', {
    title: '404',
    name: 'Rashed',
    errorMessage: 'Help article not found'
  })
})
//1. In case of no match url then it's everything else that isn't listed up to match everything.
// This is a generic one.
app.get('*', (req, res) => {
  // res.send('<h4>My 404 page</h4>')
  res.render('404', {
    title: '404',
    name: 'Rashed',
    errorMessage: 'Page not found'
  })
})



const PORT = 3000
// setting up the server
app.listen(PORT, () => {
  console.log('server is up on port ' + PORT)
})