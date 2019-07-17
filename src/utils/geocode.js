/*************************************

Geocode module

*************************************/

// Notes:

  /********************************

  mapbox API

  *********************************/

  // Geocoding is the concept of taking an address like philadelphia United States,
  // and converting that into a lattitude, longitude, coordinate pair.

  // Mapbox API is Geocoding service.
  // First, Provides an address.
  // It uses coordinate pairs with the sky API to get the weather.
  // Use an API to convert that to the lattitude and longitude.

// Function call.
// Takes one parameters,
// loads request module.
// Stores output in the variable request.
const request = require('request');

// Builds function.
// Takes two parameters,
// the address for the geocode and
// the callback function that is
// called once we have the lattitude and
// the longitude.
const geocode = (address, callback) => {

  // Initialies variable.
  // Stores url which
  // contains the secret key,
  // the request to make to the Mapbox API,
  // and cordinates to the location
  // in the variable url.
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamExMCIsImEiOiJjandqajZhNm8wbDQyNDlwN203dnNsdDFtIn0.HAm5YDx3Js05In7RC7l8gg&limit=1';

  // Function call.
  // Takes three parameters,
  // the first is the request,
  // the second automatically parses the response body as Json data, and
  // the final is a callback function to run when the request is completed.
  // The callback function takes two parameters,
  // an error object if something went wrong,
  // an a response object if everything went well.
  request({url, json: true}, (error, { body }) => {

    // Builds if statement.
    // Checks if there is an
    // error such as,
    // a connection error.
    if(error) {

      // Function call.
      // Takes two parameters.
      // Pases error back
      // to the callback function,
      // then the callback can choose what to do.
      callback('Unable to connect to location services', undefined);

    } else if(body.features.length === 0) {

      // Function call.
      // Takes two parameters.
      // Handles error if
      // the array is empty.
      // Meaning the location you provided doesn't exist.
      callback('Unable to find location.  Try another search', undefined );

    } else {

      // Function call.
      // Takes two parameters,
      // the first one is
      // undefined so there is
      // not a value for error.
      // The second one is the data
      // when things go well.
      callback(undefined, {

        // Initializes property.
        // Property call
        // using object name.
        // Stores second element of the array center
        // which is the lattitude in the variable latitude.
        // Stores output in the property latitude.
        latitude: body.features[0].center[1],
        // Initialies property.
        // Property call
        // using object name.
        // Stores first element of the array center
        // which is the longitude in the variable longitude.
        // Stores output in the property longitude.
        longitude: body.features[0].center[0],
        // Initializes property.
        // Property call
        // using object name.
        location: body.features[0].place_name

      });

    }

  });

}

// Exports geocode function
// in order to have access to the function
// in the app module.
module.exports = geocode;
