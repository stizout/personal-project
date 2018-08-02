import React, {Component} from 'react';
import './profile.css';
import {connect} from 'react-redux';
import axios from 'axios';



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            street: '',
            city: '',
            state: '',
            zip: '',
            address: [],
        }
    }

    componentDidMount() {
        // this.setState({id: this.props.user.id})
        if(this.props.user) {
            axios.get('/getAddresses/', {...this.state}).then(res => {
                this.setState({address: res.data})
            })
        }
    }

    addAddress(key, userInput) {
        this.setState({
            [key]: userInput
        })
    }

    createNewAddress(id) {
        axios.post(`/newAddress/${id}`, {...this.state}).then( res => {
            this.setState({address: res.data})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {this.props.user ?
                    <div>
                        <h1>This is my profile page.</h1>
                        <h1>{this.props.user.name}</h1>
                        <h1>Input Address: <input onChange={(e) => this.addAddress('street', e.target.value)}/></h1>
                        <h1>Input Address: <input onChange={(e) => this.addAddress('city', e.target.value)}/></h1>
                        <h1>Input Address: <input onChange={(e) => this.addAddress('state', e.target.value)}/></h1>
                        <h1>Input Address: <input onChange={(e) => this.addAddress('zip', e.target.value)}/></h1>
                        <button onClick={() => this.createNewAddress(this.props.user.id)}>Submit</button>
                    </div>
                :
                    <div>
                        <h1>You are not logged in</h1>
                        <h1>You are not logged in</h1>
                        <h1>You are not logged in</h1>
                        <h1>You are not logged in</h1>
                    </div>
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