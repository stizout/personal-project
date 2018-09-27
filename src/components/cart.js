import React, {Component} from 'react';
import './checkout.css'
import axios from '../../node_modules/axios';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer';
// import Checkout from './checkout';
import StripeCheckout from 'react-stripe-checkout';
import {Link} from 'react-router-dom';


class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            total: null,
            address: [],
            shipToAddress: [],
        }
    }
    componentDidMount() {
        axios.get('/cart').then(res => {
            if(res.data !== 'not logged in'){
            this.setState({
                cart: this.props.cart
            })
        }else {
            this.props.history.push('/login')
        }
        })
        axios.get('/cartAddress').then(res => {
            this.setState({address: res.data})
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

    shipToAddress(address, street) {
        this.setState(() => ({shipToAddress: [address,street]}))
    }
    render() {
        let prices = this.state.cart.map((product) => Number(product.price))
        let sum = prices.reduce((a,b) => a + b, 0)
        let finalSum = Math.floor(sum * 100) / 100
        console.log(this.state.address)
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
                                <p>${product.price} SKU: {product.sku}</p>
                            </div>
                        )
                    })}
                <div className="addresses-container">
                    {this.state.address.length === 0 ?
                    <div>
                        <h1>Please go to Profile to create Address</h1>
                        <Link to="/profile"><button>Jump</button></Link>
                    </div>
                    :
                    <div className="address">
                        {this.state.address.map((address) => {
                            return (
                                <div key={address.id}>
                                <button onClick={() => this.shipToAddress(address.id, address.street)}>Ship Here</button>{address.street}  {address.city}, {address.state}  {address.zip}
                                </div>
                            )
                        })}
                    </div>}
                </div>
                <h1>Total: {finalSum}</h1>
                {this.state.shipToAddress.length > 0 ?
                <h2>Ship To Address: {this.state.shipToAddress[1]}</h2>
                : null}
                {this.state.shipToAddress.length > 0 ?
                <Checkout 
                    name="Boxed"
                    amount={finalSum}
                    cart={this.state.cart}
                    orderNumber={this.props.orderNumber}
                    addressId={this.state.shipToAddress}
                    confirmation={this.props.history.push}
                    email={this.props.user.email}
                />
                : null}

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
let orderInfo = [props.orderNumber, props.addressId, props.cart ]
let confirmationEmail = [props.orderNumber, props.email, props.cart]
const CURRENCY = 'USD';
const fromUSDtoCent = amount => amount * 100;

const successPayment = data => {
  axios.post('/checkout', orderInfo).then(res => {
    localStorage.clear();
})
console.log('Payment Successful');
    axios.post('/orderEmail', confirmationEmail)
props.confirmation('/confirmation');   

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