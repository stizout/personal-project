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
app.use( express.static( `${__dirname}/../build` ) );

app.get('/dashboard', controller.readProducts);
app.get('/user', controller.getUser);
app.get('/cart', controller.cart);
app.get('/cartAddress', controller.cartAddress)
app.get('/dashboard/food', controller.getFood);
app.get('/dashboard/cleaning', controller.getCleaning);
app.get('/dashboard/pets', controller.getPets);
app.post('/orderNumber/:id', controller.orderNumber);
app.post('/checkout/', controller.purchase);
app.post('/charge', controller.stripe)
app.post('/newAddress/:id', controller.newAddress);
app.get('/getAddresses/:id', controller.getAddresses);
app.post('/logout', controller.logout);
app.put('/like/:id', controller.increaseLike)
app.delete('/deleteAddress/:id', controller.deleteAddress)
app.put('/editAddress/:id', controller.editAddress);
app.get('/orderConfirmation/:id', controller.orderConfirmation);
app.post('/orderEmail', controller.orderEmail);





// ---------- AUTH 0 ROUTES ----------------

app.get('/auth/callback', (req, res) => {
    console.log('auth/callback')
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `https://${req.headers.host}/auth/callback`
    }

    function tradeCodeForAccessToken() {
        console.log('hit trade code')
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }

    function tradeAccessTokenForUserInfo(response) {
        console.log('hit trade access')
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
                console.log(users)
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

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})



app.listen(4000, () => console.log('Server Running Personal Project'));