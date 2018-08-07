require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const nodemailer = require('nodemailer');

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
            console.log('error in getUser', err);
        })
    },
    cart: (req, res) => {
        if(req.session.user) {
            console.log(req.session.user.id)
            req.app.get('db').get_user(req.session.user.auth0id).then(users => {
                res.send(users[0])
            }).catch(err => {
                res.status(500)
                console.log('Error on the checkout', err);
            });
        } else {
            res.send('not logged in')
        }
    },
    cartAddress: (req, res) => {
        req.app.get('db').get_user_addresses(req.session.user.id).then(addresses => {
            res.send(addresses)
        }).catch(err => console.log('error on cart', err))
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
        let addressId = [req.body[1]]
        for(var i = 0; i < req.body[2].length; i++) {
            cart.push(req.body[2][i])
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
                console.log('Successful Charge');
            }
        })
    },
    newAddress: (req,res) => {
        const {street, city, state, zip} = req.body
        req.app.get('db').new_address({
            street: street,
            city: city,
            state: state,
            zip: +zip,
            user_id: +req.params.id
        }).then(
            req.app.get('db').get_addresses(+req.params.id).then(users => {
                res.json(users)
            }).catch(err => {
                console.log('error on newAddress 1', err);
            })
        ).catch(err => console.log('error on NewAddress 2', err))
    },
    getAddresses: (req, res) => {
        console.log(+req.params.id)
        req.app.get('db').get_addresses(+req.params.id).then(users => {
            res.json(users)
        }).catch(err => {
            console.log('error on getAddresses', err);
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    increaseLike: (req, res) => {
        console.log('HIT')
        // console.log('REQ.PARAMS', req.params.id)
        let newLike;
        for(var i = 0; i <req.body.length; i++) {
            if(req.body[i].id == +req.params.id) {
                newLike = req.body[i].likes + 1
            }
        }
        console.log(newLike)
        req.app.get('db').increase_like(newLike, +req.params.id).then(products => {
            res.json(products)
        }).catch(err => {
            console.log('error with increaseLike', err)
        });
    },
    deleteAddress: (req,res) => {
        req.app.get('db').delete_address(+req.params.id).then(users => {
            console.log(users)
            res.json(users)
        }).catch(err => {
            console.log('error on delete Address', err);
        });
    },
    editAddress: (req,res) => {
        const {street, city, state, zip, addressToEdit} = req.body
        req.app.get('db').get_address().then(response => {
            let newAddress = {
                street: street || addressToEdit[0].street,
                city: city || addressToEdit[0].city,
                state: state || addressToEdit[0].state,
                zip: zip || addressToEdit[0].zip,
                id: addressToEdit[0].id
            }
            console.log(newAddress)
            req.app.get('db').edit_address([
                newAddress.street,
                newAddress.city,
                newAddress.state,
                newAddress.zip,
                newAddress.id
            ]).then(response2 => {
                res.status(200)
            }).catch(err => console.log('error on editAddress', err))
        }).catch(err => console.log('error on editAddress', err))
    },
    orderConfirmation: (req, res) => {
        console.log('hit the order confirmation')
        console.log(+req.params.id)
        console.log(+req.params.id)
        req.app.get('db').get_orderConfirmation(+req.params.id).then(orders => {
            res.send(orders)
        }).catch(err => console.log('error on order Confirmation', err))
    },
    orderEmail: (req, res) => {
        console.log('Order Email Hit')
        console.log('order confirmation stuff', req.body)
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { 
                type: "OAuth2",
                user: "stizout@gmail.com", // Your gmail address.
                clientId: process.env.GMAIL_KEY,
                clientSecret: process.env.GMAIL_SECRET,
                refreshToken: process.env.GMAIL_TOKEN,
              
            }
          });
          
          var mailOptions = {
            from: 'xxx@gmail.com', // sender address
            to: req.body[1], // list of receivers
            subject: 'Order Confirmation from Boxed!', // Subject line
            text: 'Hello There Dude', // plaintext body
            html: `Order Confirmation Number ${req.body[0]}.
             If you have any questions regarding your purchase, please call us at (844) 433-8686` // html body
          };
          
          smtpTransport.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending mail', error)
            } else {
              console.log('Message sent successfully! %s sent: %s', info.messageId, info.response);
            }
            smtpTransport.close();
          });

    }
}











