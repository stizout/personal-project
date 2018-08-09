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
            display: 'none',
            sortDisplay: 'none',
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
        if(this.state.cart.length > 0) {
        if(prevState.cart.length !== this.state.cart.length) {
            const cart = JSON.stringify(this.state.cart)
            const json = JSON.stringify(total)
            localStorage.setItem('cart', cart)
            localStorage.setItem('total', json)
        }
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

    removeAll() {
        localStorage.clear();
        this.setState({cart: [], total: null})
        
    }

    getOnlyFood() {
        axios.get('/dashboard/food').then(res => {
            this.setState({products: res.data})
        })
        this.hideCategories()
    }
    getOnlyCleaning() {
        axios.get('/dashboard/cleaning').then(res => {
            this.setState({products: res.data})
        })
        this.hideCategories()
    }
    getOnlyPets() {
        axios.get('/dashboard/pets').then(res => {
            this.setState({products: res.data})
        })
        this.hideCategories()
    }

    showAll() {
        axios.get('/dashboard').then(res => {
            this.setState({products: res.data})
        })
        this.hideCategories()
    }

    updateSort(value) {
        this.setState((prevState) => {
            return {
                sort: prevState.sort = value
            }
        })
        this.sort();
    }

    sortPriceDesc() {
        axios.get('/sortPriceDesc').then(res => {
            this.setState({products: res.data})
        })
        this.hideSort();
    }
    sortPriceAsc() {
        axios.get('/sortPriceAsc').then(res => {
            this.setState({products: res.data})
        })
        this.hideSort();
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

    showCategories() {
        this.setState({display: "block"})
    }

    hideCategories() {
        this.setState({display: 'none'})
    }

    showSort() {
        this.setState({sortDisplay: "block"})

    }

    hideSort() {
        this.setState({sortDisplay: 'none'})
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
        const display = {
            display: this.state.display
        }
        const sortDisplay = {
            display: this.state.sortDisplay
        }
        return (
            <div>
            <div className="navigation-bar" onMouseLeave={() => this.hideCategories()}>
                <button onMouseEnter={() => this.showCategories()}>All Products<i className="fas fa-caret-down"></i></button>
                    <div className="dropdown-content" id="my-dropdown" style={display}>
                        <p onClick={() => this.getOnlyFood()}>Food</p>
                        <p onClick={() => this.getOnlyCleaning()}>Cleaning</p>
                        <p onClick={() => this.getOnlyPets()}>Pets</p>
                        <p onClick={() => this.showAll()}>Show All</p>
                    </div>
                    <h1>Personal Cart<i className="fas fa-caret-down"></i></h1>
            </div>
            <div className="body-dash">
                <div className="dashboard">
                    <div className="sort-button">
                        <button onMouseEnter={() => this.showSort()} onTouchStart={() => this.showSort()}>Sort By</button>
                        <div className="dropdown-content" style={sortDisplay} onMouseLeave={() => this.hideSort()} >
                            <p onClick={() => this.sortPriceDesc()} >Price <i className="far fa-arrow-alt-circle-up"></i> </p>
                            <p onClick={() => this.sortPriceAsc()} >Price <i className="far fa-arrow-alt-circle-down"></i></p>
                        </div>

                    </div>
                    <div className="dashboard-product-container">
                        { products}
                    </div>
                </div>
                <div className="cart">
                {this.state.cart.length > 0 ?
                    <div className="cart-container">
                    <button onClick={() => this.removeAll()}>Remove All</button>
                        {this.state.cart.map((product) => {
                            return (
                                <div className="cart-item" key={product.id}>
                                    <div>
                                        <img src={product.image} alt="product"/>
                                        <p className="cart-item-price">{product.price}</p>
                                        <i className="far fa-trash-alt" onClick={() => this.deleteItem(product)}></i>
                                    </div>  
                                </div>
                            )
                        })}
                    </div>
                : <img src='https://res.cloudinary.com/dvvwg1hp3/image/upload/v1533682279/Screen_Shot_2018-08-07_at_3.51.04_PM.png' alt="bonus" className="empty-cart-image"/> }
                    <Link to='/cart'>
                    {this.props.user ?
                        <button 
                            className="cart-checkout" 
                            onClick={() => this.orderNumber(this.props.user.id)}
                        >   Checkout ${Math.floor(this.state.total * 100) / 100}
                        </button>
                    :   <button className="cart-checkout">Checkout ${Math.floor(this.state.total * 100) / 100}</button>}
                    </Link>
                </div>
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