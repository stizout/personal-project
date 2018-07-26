import React, {Component} from 'react';
import './dashboard.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {getCart} from '../ducks/reducer';
import {Link} from 'react-router-dom';



class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            total: null,
        }
    }

    componentDidMount() {
        axios.get('/dashboard').then(res => {
            this.setState({products: res.data})
        })
    }

    addToCart(product) {
        let price = Number(product.price)

        this.setState((prevState) => {
            return {
                cart: prevState.cart.concat(product),
                total: prevState.total + price,
            }
        })
    }

    deleteItem(productToRemove) {
        let price = productToRemove.price
        this.setState((prevState) => {
            return {
                cart: prevState.cart.filter((product) => {
                    return product.image !== productToRemove.image
                }),
                total: prevState.total - price
            }
        })
    }

    render() {
        return (
            <div className="body">
                <div className="navbar-left">
                    <ul>
                        <li>Food</li>
                        <li>Cleaning</li>
                        <li>Pets</li>
                    </ul>
                </div>
                <div className="dashboard">
                    <div className="dashboard-product-container">
                        {this.state.products.map((product) => {
                            return (
                                <div className="dashboard-product" key={product.id}>
                                    <img src={product.image} className="dashboard-product-image" alt="product"/>
                                    <p>{product.name}</p>
                                    <p>{product.mini}</p>
                                    <p>{product.price}</p>
                                    <button onClick={() => this.addToCart(product)}>Add</button><i className="far fa-heart">{product.likes}</i>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="cart">
                    <h1>Cart</h1>
                {this.state.cart.length > 0 ?
                    <div className="cart-container">
                        {this.state.cart.map((product) => {
                            return (
                                <div className="cart-item" key={product.id}>
                                    <p><img src={product.image} alt="product"/>{product.price}</p><i className="fas fa-trash" onClick={() => this.deleteItem(product)}></i>  
                                </div>
                            )
                        })}
                    </div>
                : null }
                    <Link to='/checkout'><button className="cart-checkout" onClick={() => this.props.getCart(this.state.cart)}>Checkout {Math.floor(this.state.total * 100) / 100}</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const MapDispatchToProps = {
    getCart
}

export default connect(mapStateToProps,MapDispatchToProps)(Dashboard)