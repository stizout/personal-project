import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Cart from './components/cart';
import Login from './components/login';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/checkout" component={Cart}/>
                <Route path="/login" component={Login}/>
            </Switch>
        )
    }
}

export default Routes