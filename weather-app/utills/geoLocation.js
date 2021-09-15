const request = require('request')


const geoLocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3BhbmRhbjE5OTk5IiwiYSI6ImNrdGJ3NngyeDIwN2wydm45bjVtOXhlOGkifQ.hAzD7lNubtt1vwi7gT43sg&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback("Unable toconnect to network", undefined)
        }else if(body.features.length === 0){
            callback("Invalid Place", undefined)
        }else{
            callback(undefined, {
                 Latitude: body.features[0].center[1],
                 Longitude: body.features[0].center[0],
                 Location: body.features[0].place_name
            })
        }
})
}

module.exports = geoLocation