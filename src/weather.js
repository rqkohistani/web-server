const request = require('request')
const chalk = require('chalk')
// taking user input

const addressLocation = process.argv[2]

console.log(addressLocation);

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

geocode(addressLocation, callback)