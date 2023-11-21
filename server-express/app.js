require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./setupMongo")();

//The above line will make the key/values we definied in our 
//.env file available in our process global var.

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));


module.exports = app;
