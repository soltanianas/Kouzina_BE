require("dotenv").config();

const mongoose = require("mongoose");
var createError = require("http-errors");
const express = require("express")
var path = require("path");
var cookieParser = require("cookie-parser");
const morgan = require("morgan")

var app = express();


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));









//connect with front
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/img', express.static('uploads/images'));
app.use(morgan('combined'))

//cloud atlas
mongoose.connect('mongodb+srv://bechir:azerty123@cluster0.6igzu.mongodb.net/Kouzinty?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

// URL path
app.use("/user", require('./routes/user-router'));
app.use("/chef", require('./routes/chef-router'));
app.use("/order", require('./routes/order-router'));
app.use("/plat", require('./routes/plat-router'));


//app.use("/doc",swaaggerUI.serve, swaaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;