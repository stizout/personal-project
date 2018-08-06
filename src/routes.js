import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Cart from './components/cart';
import Login from './components/login';
import Profile from './components/profile';


class Routes extends Component {
    render() {

        return (
            <Switch>
                <Route path="/" exact render={() => <Dashboard search={this.props.search}/>}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
            
            // id={this.props.id}
        )
    }
}



export default Routes