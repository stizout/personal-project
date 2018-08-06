import React, {Component} from 'react';
import './dashboard.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {getCart} from '../ducks/reducer';
import {login} from '../ducks/reducer';
import {Link} from 'react-router-dom';
import {orderNumber} from '../ducks/reducer';



class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            total: null,
            sort: '',
            user: [],
        }
    }

    componentDidMount() {
        axios.get('/dashboard').then(res => {
            this.setState({products: res.data})
        })
        axios.get('/user').then(res => {
            this.props.login(res.data)
        })

        const json = localStorage.getItem('cart')
        const cart = JSON.parse(json)
        const total = JSON.parse(localStorage.getItem('total'))


        if(cart) {
            this.setState({cart: cart, total: total})

        }
    }
    componentDidUpdate(prevState) {
        let total = this.state.cart.map((product) => {
            return (
                product.price
            )
        }).map((x) => parseFloat(x)).reduce((a,b) => a+b,0)
        if(prevState.cart.length !== this.state.cart.length) {
            const cart = JSON.stringify(this.state.cart)
            const json = JSON.stringify(total)
            localStorage.setItem('cart', cart)
            localStorage.setItem('total', json)
        }
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

    orderNumber(id) {
        this.props.getCart(this.state.cart)
        axios.post(`/orderNumber/${id}`).then (res => {
            this.props.orderNumber(res.data)
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

    getOnlyFood() {
        axios.get('/dashboard/food').then(res => {
            this.setState({products: res.data})
        })
        
    }
    getOnlyCleaning() {
        axios.get('/dashboard/cleaning').then(res => {
            this.setState({products: res.data})
        })

    }
    getOnlyPets() {
        axios.get('/dashboard/pets').then(res => {
            this.setState({products: res.data})
        })

    }

    showAll() {
        axios.get('/dashboard').then(res => {
            this.setState({products: res.data})
        })
    }

    updateSort(value) {
        this.setState((prevState) => {
            return {
                sort: prevState.sort = value
            }
        })
        this.sort();
    }

    sort() {
        if(this.state.sort === 'low') {
            function compare(a,b) {
                let priceA = a.price * 100
                let priceB = b.price * 100
                let comparison = 0;
                if(priceA > priceB) {
                    comparison = 1;
                } else {
                    comparison = -1;
                }
                return comparison
            }
            let sorted = this.state.products.sort(compare)

            // this.setState({products: sorted})
            this.setState((prevState) => (({products: prevState.products = sorted})))

            
        } else if (this.state.sort === 'high') {
            function compare(a,b) {
                let priceA = a.price * 100
                let priceB = b.price * 100
                let comparison = 0;
                if(priceA > priceB) {
                    comparison = -1;
                } else {
                    comparison = 1;
                }
                return comparison
            }
            let sorted = this.state.products.sort(compare)
            // this.setState({products: sorted})
            this.setState((prevState) => (({products: prevState.products = sorted})))

        }
    }

    search() {
        let newArray = []
        for(let i = 0; i < this.state.cart.length; i++) {
            if(this.state.cart[i].includes(this.props.search)) {
                newArray.push(this.state.cart[i])
            }
        }
        this.setState({cart: newArray})
    }

    likeButton(id) {
        axios.put(`/like/${id}`, this.state.products).then(res => {
            this.setState({products: res.data})
        })
    }

    render() {
        // console.log(this.state.cart)
        // console.log(this.state.total)

        let products = this.state.products.filter((e) => {
            return e.name.toLowerCase().includes(this.props.search)
        }).map((product) => {
            return (
                <div className="dashboard-product" key={product.id}>
                    <img src={product.image} className="dashboard-product-image" alt="product"/>
                    <p className="turnOff">{product.name}</p>
                    <p className="turnOff">{product.mini}</p>
                    <p className="price">${product.price}</p>
                    <button onClick={() => this.addToCart(product)}>Add</button>
                    <i className="far fa-heart" onClick={() => this.likeButton(product.id)}>{product.likes}</i>
                </div>
            )
        })
        return (
            <div className="body">
            <div>
            </div>
                <div className="navbar-left">
                    <ul>
                        <li onClick={() => this.getOnlyFood()}>Food</li>
                        <li onClick={() => this.getOnlyCleaning()}>Cleaning</li>
                        <li onClick={() => this.getOnlyPets()}>Pets</li>
                        <li onClick={() => this.showAll()}>Show All</li>
                    </ul>
                </div>
                <div className="dashboard">
                        <select className="sort-input"
                            onChange={(e) => this.updateSort(e.target.value)}
                        >
                            <option>Sort By</option>
                            <option value='low'>Price Lowest</option>
                            <option value='high'>Price Highest</option>
                        </select>
                    <div className="dashboard-product-container">
                        {/* {this.state.products.map((product) => {
                            return (
                                <div className="dashboard-product" key={product.id}>
                                    <img src={product.image} className="dashboard-product-image" alt="product"/>
                                    <p>{product.name}</p>
                                    <p>{product.mini}</p>
                                    <p>{product.price}</p>
                                    <button onClick={() => this.addToCart(product)}>Add</button><i className="far fa-heart">{product.likes}</i>
                                </div>
                            )
                        })} */}
                        { products}
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
                    <Link to='/cart'>
                    {this.props.user ?
                        <button 
                            className="cart-checkout" 
                            onClick={() => this.orderNumber(this.props.user.id)}
                        >   Checkout {Math.floor(this.state.total * 100) / 100}
                        </button>
                    :   <button className="cart-checkout">Checkout {Math.floor(this.state.total * 100) / 100}</button>}
                    </Link>
                </div>
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

const MapDispatchToProps = {
    getCart,
    login,
    orderNumber
}

export default connect(mapStateToProps,MapDispatchToProps)(Dashboard)