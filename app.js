require("dotenv").config();

const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var NewsRouter = require('./routes/platRouter');
var ArticlesRouter = require('./routes/commandeRouter');
var UserRouter = require('./routes/userRouter');




var app = express();

//connect with front
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//connection to data base 
/*
//local
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected local to DataBase"));
*/


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



//URL path

app.use("/plat", NewsRouter);
app.use("/commande", ArticlesRouter);
app.use("/users", UserRouter);
//app.use("/doc",swaaggerUI.serve, swaaggerUI.setup(swaggerDocument));







// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.json({
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
    // render the error page
    res.status(err.status || 500);
});

module.exports = app;