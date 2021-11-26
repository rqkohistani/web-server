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

// const userLocation = document.querySelector('location').innerHTML= value;
// console.log(userLocation);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//********************* */
const request = require('request')
const chalk = require('chalk')
// taking user input

// const addressLocation = process.argv[2]

// console.log(addressLocation);

// change location to see the output
const unitsIn = 'units=m'//by default is m check the weatherstack documentation for info f=fahrenheit, m=metric celsius
const access_key = '47b0ec59a41936fddce4544b239349ab' //check the weatherstack I might have changed the access_key
// const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + address

const geocode = (location, callback) => {
  
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}&${unitsIn}`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connet to weather service', undefined)
    }
    else if (response.body.success === false) {
      callback('Unable to find location. Try another search e.g Malmo', undefined)
    }
    else {
      console.log(chalk.red.bold(response.body.location.name));
      callback(undefined,{
        longtitude: response.body.location.lat,
        latitude: response.body.location.lon,
        location: response.body.request.query,
        currentobservation_time: response.body.current.observation_time,
        temperature:response.body.current.temperature,
        wind_speed:response.body.current.wind_speed,
        humidity:response.body.current.humidity,
        cloudcover:response.body.current.cloudcover,
        feelslike:response.body.current.feelslike,
        is_day:response.body.current.is_day
      })
    }
  })
}
 callback = (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
}

// geocode(addressLocation, callback)
/************************************* */







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


app.get('/weather', (req, response) => {
  // res.send('Weather: app.js')
  geocode(req.body.location, (response,{
    latitude, longitude, location } = {}
  ))

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