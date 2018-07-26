import React, {Component} from 'react';
import './checkout.css'
import axios from '../../node_modules/axios';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer';




class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            total: null
        }
    }
    componentDidMount() {
        axios.get('/checkout').then(res => {
            console.log(res)
            if(res.data !== 'not logged in'){
            this.props.login(res.data)
            this.setState({
                cart: this.props.cart
            })
        }else {
            this.props.history.push('/login')
        }
        }) 
    }

    purchase(id) {
        axios.post(`/checkout/${id}`, [...this.state.cart]).then(res => {

        })
    }
    render() {
        let prices = this.state.cart.map((product) => Number(product.price))
        let sum = prices.reduce((a,b) => a + b, 0)
        console.log(this.props.user)
        return (
            <div className="checkout-body">
            {this.props.user ? 
            <div>
                <h1>{this.props.user.name}'s Order Details</h1>
            
                {this.state.cart.map((product) => {
                    return (
                        <div className="order">
                            <img src={product.image} alt='cart'/>
                            <h5>{product.name}</h5>
                            <p>{product.price} SKU: {product.sku}</p>
                        </div>
                    )
                })}

                <h1>Total: {sum}</h1><button onClick={() => this.purchase(this.props.user.id)}>Purchase</button>
                </div> : 'you are not logged in'}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = {
    login
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)