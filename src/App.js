// THIS DATABASE CAN BE FOUND AT HEROKU > DEV-MOUNTAIN-PROJECTS > DATABASE

import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
    return (
      <div className="container">
        <div className="navbar-main">
          <div className="nav-left">
            <Link to="/"><h1>BOXED</h1></Link>
            <div className="searchbar">
              <input placeholder="Search" />
              <button>Submit</button>
            </div>
          </div>
          <div className="nav-right">
            <a href={auth0}><button>Profile</button></a>
            <Link to='/checkout'><button>Cart</button></Link>
          </div>
        </div>
        <div className="main">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
