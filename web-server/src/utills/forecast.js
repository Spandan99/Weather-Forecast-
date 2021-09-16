const request = require('request')


const forecast = (Latitude, Longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=af63c78290a0adb8278eafdfb4e1dfe3&query=${Latitude},${Longitude}`

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to server", undefined)
        }else if(response.body.error){
            callback("Incorrect API Key", undefined)
        }else{
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees and it feels like ${response.body.current.feelslike} degrees`)
        }
     })
}

module.exports = forecast
