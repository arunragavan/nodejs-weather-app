const axios = require('axios')

const geoLocation = (location, callback) => {
  axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXJ1bnJhZ2hhdmFuIiwiYSI6ImNrOXhta3VubjAyYWMzbXM0eGJiMTBlbDcifQ.tp7x1IjIs2s6aOEt79U4Tg&limit=1')
    .then(({data}) => {
      let strData=JSON.stringify(data,null,'\t')
      callback(
        undefined,
        {
          latitude: data.features[0].center[0],
          longitude: data.features[0].center[1],
          name: data.features[0].place_name
        }
      )
    })
    .catch((error) => {
      console.log(error)
      callback('Map service unavailable at this time...', undefined)

    })

};

module.exports = geoLocation