require('dotenv').config()

const express = require('express'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    session = require('express-session'),
    cors =  require('cors'),
    ctrl = require('./controller/controller');

const app = express();
app.use(cors());
massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
}).catch(err => console.log(err))