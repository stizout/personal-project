require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);

module.exports = {
    readProducts: (req, res) => {
        req.app.get('db').get_products().then(products => {
            res.json(products)
        }).catch(err => {
            console.log('Error in the ReadProducts Controller', err)
        })
    },
    getUser: (req, res) => {
        if(!req.session.user) {
            res.json(null)
            return;
        }
        req.app.get('db').get_user(req.session.user.auth0id).then(users => {
            res.json(users[0])
        }).catch(err => {
            console.log('erro in getUser', err);
        })
    },
    cart: (req, res) => {
        if(req.session.user) {
            req.app.get('db').get_user(req.session.user.auth0id).then(users => {
                res.json(users[0])
            }).catch(err => {
                res.status(500)
                console.log('Error on the checkout', err);
            });

        } else {
            res.send('not logged in')
        }
    },
    orderNumber: (req, res) => {
        console.log(+req.params.id)
        req.app.get('db').create_orderNumber(+req.params.id).then(orderNumbers => {
            console.log('order number',orderNumbers[0].id)
            res.json(orderNumbers[0].id)
        }).catch(err => {
            console.log('error on orderNumber', err)
        })
    },
    purchase: (req, res) => {
        console.log('hit purchase')
        let orderNumber = [req.body[0]]
        let productId = [];
        let cart = []
        for(var i = 0; i < req.body[1].length; i++) {
            cart.push(req.body[1][i])
        }
        for(var i = 0; i < cart.length; i++) {
             productId.push(cart[i].id)
        }
            for(var i = 0; i < productId.length; i++) {
                req.app.get('db').create_order({
                    product_id: productId[i], 
                    order_id: +orderNumber
                }).then(newOrders => {
                    res.json(newOrders[0]);
                })

           }
        
    },
    getFood: (req, res) => {
        req.app.get('db').sort_food().then(products => {
            res.json(products)
        }).catch(err => {
            console.log('error with getFood request', err)
        })
    },
    getCleaning: (req, res) => {
        req.app.get('db').sort_cleaning().then(products => {
            res.json(products)
        }).catch(err => {
            console.log('error with getCleaning request', err)
        })
    },
    getPets: (req, res) => {
        req.app.get('db').sort_pets().then(products => {
            res.json(products)
        }).catch(err => {
            console.log('error with getPets request', err)
        })
    },
    stripe: (req, res) => {
        console.log('hit stripe');
        const { amount } = req.body
        stripe.charges.create({
            amount: amount,
            currency: req.body.currency,
            source: req.body.source,
        }, function(err, charge) {
            if(err) {
                console.log('Error on stripe', err)
            } else if (charge) {
                res.json(charge);
                console.log('Successful Charge', charge);
            }
        })
    },
    newAddress: (req,res) => {
        const {street, city, state, zip} = req.body
        console.log(street, city, state, zip)
        console.log(req.params.id)
        req.app.get('db').new_address({
            street: street,
            city: city,
            state: state,
            zip: +zip,
            user_id: +req.params.id
        }).then(newAddress => {
            res.json(newAddress)
        }).catch(err => {
            console.log('error on newAddress', err);
        })
    },
    getAddresses: (req, res) => {
        console.log(req.body)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }

}











