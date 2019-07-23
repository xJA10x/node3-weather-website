/**************************************

Forecast module

***************************************/

// Function call.
// Takes one parameter,
// loads the request module.
// Stores output in the variable request.
const request = require('request');

// Builds function.
// Takes three parameters,
// the latitude, longitude, and
// the callback to run once
// we have the lattitude and the
// longitude.
const forecast = (latitude, longitude, callback) => {

  // Initialies variable.
  // Stores url which
  // contains the secret key,
  // the request to make to the weather API.
  // Stores output in the variable url.
  const url = 'https://api.darksky.net/forecast/43da0e9b68ec10e0faf6b912c24cd0c1/' + latitude + ',' + longitude;

  // Function call.
  // Takes three parameters,
  // the first is the request,
  // the second automatically parses the response body as Json data, and
  // the final is a callback function to run when the request is completed.
  // The callback function takes two parameters,
  // an error object if something went wrong,
  // an a response object if everything went well.
  request({url , json:true}, (error, {body}) => {

    // Builds if statement.
    // Checks if there is an error,
    // such as a connection error.
    if(error) {

      // Function call.
      // Takes two parameters.
      // Pases error back
      // to the callback function,
      // then the callback can choose what to do.
      callback('Unable to connect to weather service!', undefined);

    } else if(body.error) {

      // Function call.
      // Takes two parameters.
      // Handles error if the location
      // you provided does not exist.
      callback('Unable to find location', undefined);

    } else {

      // Function call.
      // Takes two parameters.
      // The properties to display to the browser.
      // everything went well.
      callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " farenheit degress out. The high temperature today is " + body.daily.data[0].temperatureHigh + " degrees with a low temperature of " + body.daily.data[0].temperatureLow +  " degrees. There is a " + body.currently.precipProbability + "% chance of rain.");

    }

  });

}

// Export forecast function
// in order to have access to
// the function in the app module.
module.exports = forecast;
