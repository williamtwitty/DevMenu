const express = require('express'),
bodyParser = require('body-parser'),
massive = require('massive'),
session = require('express-session'),
cors =  require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 6000;

app.listen(PORT, ()=> console.log('Listening on port:' , PORT))