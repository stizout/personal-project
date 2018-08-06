import React, {Component} from 'react';
import './checkout.css'
import axios from '../../node_modules/axios';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer';
// import Checkout from './checkout';
import StripeCheckout from 'react-stripe-checkout';


class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            total: null
        }
    }
    componentDidMount() {
        axios.get('/cart').then(res => {
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
            this.setState({
                cart: [],
                total: null
            })
        }).catch(err => {
            console.log('error on purchase method', err)
        })
    }
    render() {
        let prices = this.state.cart.map((product) => Number(product.price))
        let sum = prices.reduce((a,b) => a + b, 0)
        let finalSum = Math.floor(sum * 100) / 100
        // console.log(this.props.user)
        console.log(this.props.orderNumber)
        return (
            <div className="checkout-body">
            {this.props.user ? 
            <div>
                <h1>{this.props.user.name}'s Order Details</h1>
            
                {this.state.cart.map((product) => {
                    return (
                        <div className="order" key={product.id}>
                            <img src={product.image} alt='cart'/>
                            <h5>{product.name}</h5>
                            <p>{product.price} SKU: {product.sku}</p>
                        </div>
                    )
                })}

                <h1>Total: {sum}</h1>
                <Checkout 
                    name="Boxed"
                    amount={finalSum}
                    cart={this.state.cart}
                    orderNumber={this.props.orderNumber}
                />

                </div> : 'you are not logged in'}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
        orderNumber: state.orderNumber
    }
}

const mapDispatchToProps = {
    login
}

const Checkout = (props) => {
    const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
const PAYMENT_SERVER_URL = '/charge';
let orderInfo = [props.orderNumber, props.cart]
const CURRENCY = 'USD';
const fromUSDtoCent = amount => amount * 100;

const successPayment = data => {
  axios.post('/checkout', orderInfo).then(res => {
      console.log(props.cart)
      console.log(props.orderNumber)
    console.log(res.data)
  })
    console.log('Payment Successful', data);
  };

  const errorPayment = data => {
    console.log('Payment Error', data);
  };

  const onToken = (amount) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDtoCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);
    const Checkout = ({ name, description, amount }) =>
    <StripeCheckout
      name={name}
      description={description}
      amount={fromUSDtoCent(amount)}
      token={onToken(amount)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
    return (
        <div>
            <Checkout
                name="Boxed"
                amount={props.amount}
            />

        </div>
    )
}









export default connect(mapStateToProps, mapDispatchToProps)(Cart)