const axios = require('axios').default;

const geocode = (address, callback) => {
  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlrYWhhbnoiLCJhIjoiY2tnM3Yyc216MGVwNTJ4bG4xZGo1dnhleiJ9.iYekWsjiQpktoEEsdgoSbQ&limit=1`;

  axios({
    method: 'get',
    url: geoCodingUrl,
    responseType: 'json',
  })
    .then((response) => {
      const { features } = response.data;

      //console.log(response.data);
      if (features.length !== 0) {
        const data = {
          location: features[0].place_name,
          Lon: features[0].center[0],
          Lat: features[0].center[1],
        };
        callback(undefined, data);
      } else {
        //console.log('Location not found!');
        callback({ error: 'Location Not Found' }, undefined);
      }
    })
    .catch((err) => {
      if (err.response) {
        const { status, statusText } = err.response;
        callback(
          { error: `Error with response. Error: ${statusText}, ${status}` },
          undefined
        );
      } else if (err.request) {
        callback(
          {
            error: `Error with request. Error: Unable to connect to location services, Please check connection!`,
          },
          undefined
        );
      } else {
        callback({ error: `${err}` }, undefined);
      }
    });
};

module.exports = geocode;
