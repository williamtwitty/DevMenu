require('dotenv').config()

const express = require('express'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    session = require('express-session'),
    cors =  require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0');
    ctrl = require('./controller/controller')

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
app.get('/api/:table', ctrl.getCheckByTable)
app.get('/allorders', ctrl.getAdminOrders)

app.post('/api/neworder', ctrl.newOrderPlaced)

const PORT = 3030;

server.listen(PORT, ()=> console.log('Listening on port:' , PORT))

    io.on('connection', function(socket) {
        console.log('we are connected');
    socket.on('disconnect', function(socket){
        console.log('we disconnected');
    })
})