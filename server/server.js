const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
const axios = require('axios');

require('dotenv').config();




const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(database => app.set('db', database)).catch(err => console.log('error on massive', err));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

app.get('/dashboard', controller.readProducts);
app.get('/user', controller.getUser);
app.get('/checkout', controller.checkout);
app.post('/orderNumber/:id', controller.orderNumber);
app.post('/checkout/:id', controller.purchase);






// ---------- AUTH 0 ROUTES ----------------

app.get('/auth/callback', (req, res) => {
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    function tradeCodeForAccessToken() {
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }

    function tradeAccessTokenForUserInfo(response) {
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${response.data.access_token}`)
    }

    function storeUserInfoInDatabase(response) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear(); 
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = mm + '/' + dd + '/' + yyyy;
        return req.app.get('db').get_user(response.data.sub).then(users => {
            if(users.length) {
                req.session.user = users[0]
                res.redirect('/')
            } else {
                const newUser = {
                    auth0id: response.data.sub,
                    name: response.data.name,
                    email: response.data.email,
                    joined: today
                }
                    console.log(newUser)
                return req.app.get('db').create_user(newUser).then(newUsers => {
                    req.session.user = newUsers[0]
                    res.redirect('/')
                })
            }
        })
    }

    tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(err => {
        console.log('Error trade code for access token', err)
        res.status(500)
    })
})



app.listen(4000, () => console.log('Server Running Personal Project'));