const request = require('request')
const geoLocation = require('./utills/geoLocation')
const forecast = require('./utills/forecast')

const address = process.argv[2]

if (!address){
       console.log("Please provide an address")
}else{
       geoLocation(address, (error, { Latitude, Longitude, Location }) => {
              if(error) {
                     console.log(error)
              }
           
           
               forecast(Latitude, Longitude, (error, forecastdata) => {
                  if (error) {
                         console.log(error)
                  }
                  console.log(Location)
                  console.log(forecastdata)
           })
           })
}



