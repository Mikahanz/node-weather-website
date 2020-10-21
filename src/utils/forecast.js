const axios = require('axios');
const geocode = require('../utils/geocode');

const getForecast = (location, callback) => {
  geocode(location, (error, data) => {
    if (typeof data !== 'undefined') {
      const { Lat, Lon, location } = data;

      let coordinates = `${Lat},${Lon}`;
      let locationName = `${location}`;

      const theUrl = `http://api.weatherstack.com/current?access_key=23d8404e420b953150b9ece6f36d75a6&query=${coordinates}&units=m`;
      axios({
        method: 'get',
        url: theUrl,
        responseType: 'json',
      })
        .then((response) => {
          if (typeof response.data.location !== 'undefined') {
            callback(undefined, response.data, locationName);
            //console.log(response.data);
          } else {
            callback(
              `${response.data.error.type}. ${response.data.error.info}`,
              undefined
            );
          }
        })
        .catch((err) => {
          if (err.response) {
            callback(
              `Error with response. Error: ${err.response.statusText}, ${err.response.status}`,
              undefined
            );
          } else if (err.request) {
            callback(
              `Error with request. Error: Unable to connect to location services, Please check your connection!`,
              undefined
            );
          } else {
            callback(`Error: ${err}`, undefined);
          }
        });
    } else {
      callback(error, undefined);
    }
  });
};

module.exports = getForecast;
