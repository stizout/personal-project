import React, {Component} from 'react';
import './profile.css';
import {connect} from 'react-redux';
import axios from 'axios';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            street: '',
            city: '',
            state: '',
            zip: '',
            id: this.props.user ? this.props.user.id : null,
            userInfo: [],
            showCreateAddress: false,
            showEditAddress: false,
            addressToEdit: {},
        }
    }
    
    componentDidMount() {
        if(!this.props.user) {
            this.props.history.push('/login')
        }

    } 
    seeAddress(id) {
        axios.get(`/getAddresses/${id}`).then( res => {
            this.setState({userInfo: res.data})
        })
    }

    addAddress(key, userInput) {
        this.setState({
            [key]: userInput
        })
    }

    showCreateAddress() {
        this.setState({showCreateAddress: !this.state.showCreateAddress})
    }

    showEditAddress(id) {
        let address = this.state.userInfo.filter((address) => {
            return (
                address.id === id
            )
        })
        this.setState({showEditAddress: !this.state.showEditAddress, addressToEdit: address})
    }

    createNewAddress(id) {
        axios.post(`/newAddress/${id}`, {...this.state}).then( res => {
            console.log(res.data)
            this.setState({userInfo: res.data, showCreateAddress: false})
        })
    }

    deleteAddress(id) {
        let userId = this.state.id
        axios.delete(`/deleteAddress/${id}`, userId).then(res => {
            console.log(res.data)
        })
    }

    editAddress(id) {
        axios.put(`/editAddress/${id}`, {...this.state})
    }

    render() {
        
        return (
            <div className="body">
                {this.props.user ?
                    <div>
                        <div className="user-info-container">
                            <h1>{this.props.user.name}</h1>
                            <button onClick={() => this.seeAddress(this.state.id)}>Show My Info</button>
                            <button onClick={() => this.showCreateAddress()}>Create Address</button>
                            
                            {this.state.userInfo.length > 0 ? 
                            <div>
                                <p className=" user-basic">{this.state.userInfo[0].email} || <span className="user-basic joined-date"> Joined: {this.state.userInfo[0].joined.split('T')[0]}</span></p>
                                <div className="user-info">
                                <br/>
                                <h1>My Addresses:</h1>
                                    {this.state.userInfo.map((user) => {
                                        return (
                                            <div key={user.street}>
                                                <p>
                                                    {user.street}  {user.city}, {user.state}  {user.zip}  
                                                    <i class="far fa-trash-alt" onClick={() => this.deleteAddress(user.id)}></i>
                                                    <button onClick={() => this.showEditAddress(user.id)}
                                                    >Edit
                                                    
                                                    </button>
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            : null }
                        </div>
                        {this.state.showCreateAddress ?
                        <div className="create-address-inputs">
                            <p>Street: <input onChange={(e) => this.addAddress('street', e.target.value)}/></p>
                            <p>City: <input onChange={(e) => this.addAddress('city', e.target.value)}/></p>
                            <p>State: <input onChange={(e) => this.addAddress('state', e.target.value)}/></p>
                            <p>Zip: <input onChange={(e) => this.addAddress('zip', e.target.value)}/></p>
                            <button onClick={() => this.createNewAddress(this.props.user.id)}>Submit</button>
                        </div>
                        : null }
                        {this.state.showEditAddress ?
                        <div className="edit-address-inputs">
                            <p>Street: <input onChange={(e) => this.addAddress('street', e.target.value)}/></p>
                            <p>City: <input onChange={(e) => this.addAddress('city', e.target.value)}/></p>
                            <p>State: <input onChange={(e) => this.addAddress('state', e.target.value)}/></p>
                            <p>Zip: <input onChange={(e) => this.addAddress('zip', e.target.value)}/></p>
                            <button onClick={() => this.editAddress(this.props.user.id)}>Submit</button>
                        </div>
                        : null }
                    </div>
                :
                        <h1>You are not logged in</h1>

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Profile)