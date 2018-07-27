

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
    checkout: (req, res) => {
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
        let productId = [];
        const { id } = req.params
        for(var i = 0; i < req.body.length; i++) {
             productId.push(req.body[i].id)
        }
            for(var i = 0; i < productId.length; i++) {
                req.app.get('db').create_order({
                    product_id: productId[i], 
                    order_id: +id
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

}