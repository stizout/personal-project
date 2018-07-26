

module.exports = {
    readProducts: (req, res) => {
        req.app.get('db').get_products().then(products => {
            res.json(products)
        }).catch(err => {
            console.log('Error in the ReadProducts Controller', err)
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
    purchase: (req, res) => {
        // for(var i = 0; i < req.body.length; i++) {
        //     console.log(req.body)
        // }
        let id = [];
        for(var i = 0; i < req.body.length; i++) {
             id.push(req.body[i].id)
            console.log(id)
        }
            for(var i = 0; i < id.length; i++) {
                const newOrder = {
                    user_id: req.params.id,
                    product_id: id[i]
                }
                return newOrder
           }
        
        req.app.get('db').create_order(newOrder).then(newOrders => {

            req.app.get('db').query('')
            res.json(newOrders);
        })
    }
}