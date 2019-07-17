/************************************

JavaScript file

*************************************/

// Notes:
  // Client side javascript to fetch weather data or forecast information
  // to render to the browser.
  // Fetch is a browser base API.
    // It is something we can use in all modern browsers,
    // but it is not accesible in node.

    // This code does not run in the back end.

    // The behavior of the form element is to quicly reload the page.

// Function call.
// Takes one parameter,
// a string which is the URL we are
// trying to fetch(retrieve) from.
// Second Method runs when the data is available.
// Makes http request.
// Fetch data from the url below and then run the callback functon.
//fetch('http://puzzle.mead.io/puzzle').then((response) => {

  // Method call
  // using object name.
  // Takes no parameters.
  // Second method is a callback function that runs when the json data has arrived.
  // Parses json data.
  //response.json().then((data) => {

    // Outputs to the console.
    //console.log(data);


  //})

//});


/*************************************

Targets elements from index.hbs

***************************************/

// Method call
// using object name.
// Takes one paramter,
// a string.
// Gets html form element from index.hbs
// to allow user to submit on the form.
// Stores output in the variable weatherForm.
const weatherForm = document.querySelector('form');
// Method call
// using object name.
// Takes one parameter,
// a string.
// Gets value user typed in the input form element from index.hbs.
// Stores output in the variable search.
const search = document.querySelector('input');
// Method call
// using object name.
// Takes one parameter,
// a string.
// Gets p element from index.hbs
// in order to render the paragraph with the json
// data to the browser.
// Stores output in the variable messageOne.
const messageOne = document.querySelector('#message-1');
// Method call
// using object name.
// Takes one parameter,
// a string.
// Gets p element from index.hbs
// in order to render the paragraph with the json
// data to the browser.
// Stores output in the variable messageTwo.
const messageTwo = document.querySelector('#message-2');

/******************************************

Event litsener

********************************************/

// Method call
// using object name.
// Takes two parameters,
// the first is a string with the
// name of the event we are trying to litsen for.
// The second is a callback function that runs every single time
// an event occurs, in this case every time the form is submited.
// Builds event litsener
// to run code
// when smeone submits the form.
// This code is responsible for feching the weather and rendering to the browser.
weatherForm.addEventListener('submit', (e) => {

  // Method call
  // using object name.
  // Event object.
  // This method prevents default behavior
  // of reolading the page every time a form is submitted.
  e.preventDefault()

  // Property call
  // using object name.
  // Extracts value after the user
  // has submited the form.
  // We use this value to fetch the forecast for
  // that location.
  // Stores output in the variable location.
  const location = search.value
  // Property call
  // using object name.
  // Changes text for the p element.
  // Renders paragraph to the browser.
  messageOne.textContent = 'Loading......';
  // Property call
  // using object name.
  // Changes text for the p element.
  // Renders paragraph to the browser.
  messageTwo.textContent = "";

  // Uses text provided by the input form
  // to generate the url that we will pass to fetch.
  // Function call.
  // Takes one parameter,
  // a string which is the URL we are
  // trying to fetch from.
  // Second Method runs when the data is available.
  // Makes http request.
  // Fetch data from the url below which is the weather API,
  // adds location entered by the user in the form at the end of the url,
  // and then runs the callback functon.
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {

    // Method call
    // using object name.
    // Takes no parameters.
    // Second method is a callback function that runs when the json data has arrived.
    // Parses json data.
    response.json().then((data) => {

      // Builds if stament.
      // Run if there is an error.
      if(data.error) {

        // Property call
        // using object name.
        // Render error to the paragraph.
        messageOne.textContent = data.error

      } else {

        // Property call
        // using object name.
        // Renders location
        // and the forecast to the browser.
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast

      }

    })

  });


});
