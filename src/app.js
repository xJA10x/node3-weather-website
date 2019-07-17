/************************************

Starting point of our node application

**************************************/

  // Notes:
    // Express is an npm framework
    // for building web applications.
    // In express we can create a
    // node.js server to serve up
    // an intire website.
    // All files such as html, css, javascript,
    // images and so on are called assets.
    // A framework is a library of code.

// Example
  // We own the following domain
  // that will run in a single express server
  // This are all routes.
    // app.com
    // app.com/help
    // app.com/about

// 3000 is a common port for when being in the developemnt process.

// Method call in
// an object is called a method.
// Function call
// without an object is a called a function.

// Rendering dynamic pages to the browser.
// In the views directory we can put our handle bars.
// Handle bars allows
// us to server dynamic pages.

// Partials allows us to create a little template
// which is part of a bigger web page.
// It allows you to create something once
// and use it among multiple pages.
// Pages that we are going to reuse in multiple pages
// of our site. These are things like headers or footers that
// you want to be showing on every page.
// What goes inside partials is part of a web page.

// Function call.
// Takes one parameter,
// loads the path module
// in order to work with
// paths in our directory.
// Stores output in the variable path.
const path = require('path');
// Function call.
// Takes one parameter,
// Loads express library.
// Stores output in the variable express.
// This is what allows us to create an express application.
const express = require('express');
// Function call.
// Takes one parameter,
// loads hbs module
// in order to work with partials.
// Stores output in the variable hbs.
const hbs = require('hbs');
// Function call.
// Takes one parameter,
// loads geocode module
// in order to have access to variables and functions.
// Stores output in the variable geocode.
const geocode = require('./utils/geocode');
// Function call.
// Takes one parameter,
// loads forecast module
// in order to have access to variables and functions.
// Stores output in the variable forecast.
const forecast = require('./utils/forecast');

// Function call.
// Takes no parameters,
// Stores express application
// in the variable app.
// Starts express app.
const app = express();

/***************************

Define paths for Express config.

******************************/

// Method call
// using object name.
// Takes two parameters.
// Stores path to the index.html, about.html, and help.html files
// in the variable publicDirectory.
const publicDirectory = path.join(__dirname, '../public');
// Method call
// using object name.
// Takes two parameters,
// the path to the folder,
// and a second argument to alter the path name .
// Stores output in the variable viewsPath.
const viewsPath = path.join(__dirname, '../templates/views');
// Method call
// using object name.
// Takes two parameters,
// the first one is the path to the folder,
// and the second is the partials directory.
// Stores output in the variable partialPath.
const partialsPath = path.join(__dirname, '../templates/partials');

/*****************************************

Set up handlebars engine and views location

******************************************/

// Method call
// using object name.
// Takes two parameters,
// the setting name and the value we
// want to set.
// In this case the setting is
// views engine and the value
// we want to set is the module we installed.
// This module allows us to get handle bars set up
// and dynamic templates.
app.set('view engine', 'hbs');
// Method call
// using object name.
// Takes two parameters,
// the setting name and the value we
// want to set.
// In this case the setting is
// views and the the value we want to set
// is the path to the templates directory.
app.set('views', viewsPath);
// Method call
// using object name.
// Takes one parameter,
// the path to the directory where your
// partial lives.
hbs.registerPartials(partialsPath);

/***********************************

Setup static directory to serve

***********************************/

// Method call
// using object name.
// Takes one parameter,
// This method allows us to
// customize our server to
// serve up a directory. It
// takes the path to the folder
// we want to serve up. In this case,
// it loads index.html, about.html, and help.html, css, img, and
// javascript files.
app.use(express.static(publicDirectory));

// Method call
// using object name.
// Takes two parameters,
// the first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when someone visits a specific route.
// Sets up Route.
app.get('', (req, res) => {

  // Method call
  // using object name.
  // Takes two parameters,
  // the first one is the name of the view to render,
  // and the second one is
  // an object that contains all of the values you
  // want that view to be able to access.
  // sends back response to the requester.
  // Render allows us to render one
  // of our views.
  res.render('index', {

    // Initializes properties.
    title: 'Weather',
    name: 'Jhoset Ceron'

  });

});

// Method call
// using object name.
// Takes two parameters,
// the first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when someone visits a specific route.
// Sets up route.
app.get('/about', (req, res) => {

  // Function call
  // using object name.
  // Takes two parameters,
  // the first one is the name of the view to render,
  // and the second one is
  // an object that contains all of the values you
  // want that view to be able to access.
  // sends back response to the requester.
  // Render allows us to render one
  // of our views.
  res.render('about', {

    // Initializes properties.
    title: 'About Me',
    name: 'Jhoset Ceron'

  });

});

// Method call
// using object name.
// Takes two parameters,
// the first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when someone visits a specific route.
// Sets up route.
app.get('/help', (req, res) => {

  // Function call
  // using object name.
  // Takes two parameters,
  // the first one is the name of the view to render,
  // and the second one is
  // an object that contains all of the values you
  // want that view to be able to access.
  // sends back response to the requester.
  // Render allows us to render one
  // of our views.
  res.render('help', {

    // Initializes properties.
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Jhoset Ceron'

  });

});

// Method call
// using object name.
// Takes two parameters.
// The first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when somone visits a specific route.
// Sets up Route.
app.get('/weather', (req, res) => {

  // Builds if statement.
  // Makes sure that search query string is actually
  // there in the URL before we send the product.
  // Runs when something has gone wrong,
  // meaning there is no search term.
  if(!req.query.address) {

    // Method call
    // Using object name.
    // Takes one parameter,
    // sends back json data.
    // Return stops the function execution.
    return res.send({

      // Initializes property.
      // puts element inside of the address array.
      error: 'You must provide an address!'

    });

  }

  // Function call
  // Takes two parameters,
  // the address to geocode,
  // and a callback function.
  // The callback function takes
  // two parameters,
  // error as a string,
  // and destructures data.
  // Sets up default parameter.
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

    // Builds if statement.
    // Runs if there was an error.
    if(error) {

      // Sends back object
      // with an error property.
      // Renders data to the browser.
      return res.send({error})

    }

    // Function call
    // Takes three parameters.
    forecast(latitude, longitude, (error, forecastData) => {

      // Builds if statement.
      // Runs if there is an error.
      if(error) {

        // Sends back object
        // with an error property.
        // Renders data to the browser.
        return res.send({error})

      }

      // Function call
      // using object name.
      // Takes one parameter,
      // sends back response to the requester
      // using json format.
      res.send({

        forecast: forecastData,
        location,
        address: req.query.address

      })

    })

  })

});

// Method call
// using object name.
// Takes two parameters.
// The first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when someone visits a specific route.
// Setps us route.
app.get('/products', (req, res) => {

  // Builds if statement.
  // Makes sure that search query string is actually
  // there before we send the product.
  // Runs when something has gone wrong,
  // meaning there is no search term.
  if(!req.query.search) {

    // Method call
    // Using object name.
    // Takes one parameter,
    // sends back json data.
    // Return stops the function execution.
    return res.send({

      // Initializes property.
      // puts element inside of the products array.
      error: 'You must provide a search term'

    });

  }

  // Property call
  // using object name.
  // query contains all
  // of the query string information.
  // gets value from search query string.
  console.log(req.query.search);

  // Function call
  // using object name.
  // Takes one parameter,
  // sends back response to the requester
  // using json format.
   res.send({

    // Initializes property
    // that has an empty array.
    products: []

  });

});

// Method call
// using object name.
// Takes two parameters,
// the first one is the route when getting the request,
// and the second one is a function that decides what we
// want to do when we get a request and sends back a response
// when someone visits a specific route.
// Sets up route.
app.get('/help/*', (req, res) => {

  res.render('404', {

    // Initializes properties.
    title: '404',
    name: 'Jhoset Ceron',
    errorMessage: 'Help article not found'

  });

});

// Method call
// using object name.
// Takes two parameters,
// the first one is the route when getting the request,
// and the second is a function that decides what we
// want to do when get a request and sends back a response
// when someone visits a specific route.
// Sets up Route.
app.get('*', (req, res) => {

  // Function call
  // using object name.
  // Takes two parameters,
  // the first one is the name of the view to render,
  // and the second one is
  // an object that contains all of the values you
  // want that view to be able to access.
  // sends back response to the requester.
  // Render allows us to render one
  // of our views.
  res.render('404',  {

      // Initializes properties.
      title: '404',
      name: 'Jhoset Ceron',
      errorMessage: 'Page not found.'

  });

});

// Method call
// using object name.
// Takes two parameters,
// the first one
// Starts the server
// to litsen for request at a given port,
// or builds the server to litsen for request at a given port.
// The second one is a callback function
// that will run when the server is up
// and running.
app.listen(3000, () => {

  // Lets the person know that
  // the server started correcly.
  console.log('Server is up on port 3000');

});
