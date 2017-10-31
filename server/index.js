require('dotenv').config()
const express = require('express'),
bodyParser = require('body-parser'),
massive = require('massive'),
session = require('express-session'),
cors =  require('cors');
const ctrl = require('./controller/controller')

const app = express();
app.use(bodyParser.json());
app.use(cors());
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
}).catch(err => console.log(err))

app.get('/api/:type', ctrl.getMenuType)
const PORT = 6000;

app.listen(PORT, ()=> console.log('Listening on port:' , PORT))