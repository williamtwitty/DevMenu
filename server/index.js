require('dotenv').config()

const express = require('express'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    session = require('express-session'),
    cors =  require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0');
    ctrl = require('./controller/controller');
    stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
}).catch(err => console.log(err))

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');

db.get_admin([profile.identities[0].user_id]).then( user => {
        
    if (user[0]) {
        done(null, user[0].id)
    } else {
        db.create_admin([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id]).then( user => {
            done(null, user[0].id)
            })}
        }).catch(err=> console.log(err))
    }
))

passport.serializeUser(function(userId, done) {
    done(null, userId)
})

passport.deserializeUser(function(userId, done) {
    app.get('db').current_admin([userId]).then( user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/admin',  
    failureRedirect: '/auth'
}))

app.get('/auth/user', passport.authenticate('auth0'), (req, res) => {
    if (!req.user) {
        return res.status(404).send('User not found')
    } else {
        return res.status(200).send(req.user)
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut()
    res.redirect(302, 'https://dev-menu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000%2F&client_id=RO5VKD0VU0JRf2br77hOxEmyWokY6D2N')
})


app.get('/api/:type', ctrl.getMenuType)
app.get('/checkout/:table', ctrl.getCheckByTable)
app.get('/allorders', ctrl.getAdminOrders)
app.get('/tablemessages/:table', ctrl.getMessagesByTable)

app.post('/api/newmessage', ctrl.sendNewMessage)
app.post('/api/neworder', ctrl.newOrderPlaced)
app.patch('/api/completed', ctrl.patchCompleted)
app.delete('/api/delete/:id/:table', ctrl.deleteItem)

app.post('/api/payment', function (req, res, next) {

    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if (amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
        break;
      } else {
        pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
      amount: convertedAmt, // amount in cents, again
      currency: 'usd',
      source: req.body.token.id,
      description: 'Test Charge'
    }
    )}
)


const PORT = 3030;
server.listen(PORT, ()=> console.log('Listening on port:' , PORT))

var admin = io.of('/admin')

    admin.on('connection', function(socket){
       // console.log('Admin has connected');
    })
    admin.on('disconnect', function(socket){
        //console.log('Admin is outta here');
    })

        var customer = io.of('/customer')

        customer.on('connection', function(socket){
           // console.log('Customer has connected');
        })

    io.on('connection', function(socket) {
       // console.log('we are connected');
    
    socket.on('new customer', function(table) {
         console.log('New customer seated at table:', table);
        io.of('/admin').emit('new customer admin', table )
    })

    socket.on('new order', function(table) {
        console.log('Table:', table, 'has ordered a new item');
        io.of('/admin').emit('new item ordered', table)
    })

    socket.on('new message', function(table, msg) {
        console.log('Table:', table, 'has requested', msg);
    })



    socket.on('disconnect', function(socket){
        console.log('we disconnected');
    })
})