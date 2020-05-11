const axios = require('axios')

const weatherData = (longtitude, latitude, callback) => {
    axios.get('http://api.weatherstack.com/current?access_key=a3bf931f7d3ceee25a9b2965a5c0741c&query=' + longtitude + ',' + latitude)
        .then(({data}) => {
            console.log(data)
            callback(undefined,
                {
                    temperature: data.current.temperature,
                    weather_descriptions: data.current.weather_descriptions[0]
                }
            )
        }
        )
        .catch((error) => {
            //console.log(error)
            callback('Weather service Unavailable at this time!, Please try again..', undefined)
        })

};

module.exports = weatherData