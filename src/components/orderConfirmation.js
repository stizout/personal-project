import React from 'react';
import './orderConfirmation.css'
import axios from 'axios';
import {connect} from 'react-redux';

class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: [],
            id: this.props.orderNumber ? this.props.orderNumber : null,
        }
    }

    componentDidMount() {
        let orderNumber = this.state.id
        console.log(orderNumber)
        axios.get(`/orderConfirmation/${orderNumber}`).then(res => {
            console.log(res.data)
            this.setState({orderInfo: res.data})
        })
    }
    render() {
        return (
            <div>
                <div className="confirmation-body">
                    <h1>Order Confirmation Number: {this.state.id}</h1>
                        {this.state.orderInfo.map((product) => {
                            return (
                                <div key={product.id} className="product">
                                    <img src={product.image} alt='cart'/>
                                    <h5>{product.name}</h5>
                                    <p>{product.price}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderNumber: state.orderNumber
    }
}

export default connect(mapStateToProps)(OrderConfirmation)