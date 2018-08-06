// THIS DATABASE CAN BE FOUND AT HEROKU > DEV-MOUNTAIN-PROJECTS > DATABASE

import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      search: '',
    }
  }

  showProfile() {
    this.setState({display: 'block'})
  }

  hideProfile() {
    this.setState({display: 'none'})
  }

  search(userInput) {
    this.setState({search: userInput})
  }

  logout() {
    axios.post('/logout')
  }




  render() {
    const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
    const display = {
      display: this.state.display
    }

    return (
      <div className="container">
        <div className="navbar-main">
          <div className="nav-left">
            <Link to='/'><h1>BOXED</h1></Link>
            <div className="searchbar">
              <input placeholder="Search" onChange={(e) => this.search(e.target.value)}/>
            </div>
          </div>
          <div className="nav-right">
          <div className="dropdown" onMouseLeave={() => this.hideProfile()}>
            <button onMouseEnter={() => this.showProfile()} >Profile</button>
              <div className="dropdown-content" id="my-dropdown" style={display}>
                <Link to='/profile'><p>My Account</p></Link>
                <p onClick={() => this.logout()}>Logout</p>
                <a href={auth0} className="login-dropdown">Login</a>
              </div>
          </div>
            <Link to='/cart'><button className="cart-button">Cart</button></Link>
          </div>
        </div>
        <div className="main">
          <Routes search={this.state.search} />
          {/* id={this.props.user ? this.props.user.id : undefined} */}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

export default App;
// export default connect(mapStateToProps)(App);