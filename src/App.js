// THIS DATABASE CAN BE FOUND AT HEROKU > DEV-MOUNTAIN-PROJECTS > DATABASE

import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      search: '',
      showAnnounce: 'none',
      announcements: [
        {
          img: 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pop-tarts-oreo.jpg',
          title: 'Get your Oreo on TODAY!!',
          date: 'August 6'
        },
        {
          img: 'https://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450603/planters-nuts-peanuts.jpg',
          title: 'Now serving Planters Peanuts, add to your cart and enjoy each bite!',
          date: 'August 2'
        },
        {
          img: 'http://res.cloudinary.com/dvvwg1hp3/image/upload/f_auto/v1532450604/pringles-cheedar.jpg',
          title: 'Pringles Cheddar are back in stock and availble upon purchase',
          date: 'July 28'
        },
      ]
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
    axios.post('/logout').then(
      this.props.history.push('/')
    )
  }

  showAnnouncements() {
    this.setState({showAnnounce: 'flex'})
    if(this.state.showAnnounce === 'flex') {
      this.setState({showAnnounce: 'none'})
    }
  }

  render() {
    const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
    const display = {
      display: this.state.display
    }
    const displayAnnounce = {
      display: this.state.showAnnounce
    }
    const announcements = this.state.announcements.map((item,i) => {
      return (
        <div className="announcement-item" key={i}>
          <img src={item.img} className="announcement-image"/>
          {item.date}
          <p>{item.title}</p>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="navbar-main">
          <div className="nav-left">
            <Link to='/'><img src='https://res.cloudinary.com/dvvwg1hp3/image/upload/v1533681123/Screen_Shot_2018-08-07_at_3.29.46_PM.png'/></Link>
            <div className="searchbar">
              <input placeholder="Search for your favorite items in bulk" onChange={(e) => this.search(e.target.value)} /><i className="fas fa-search"></i>
            </div>
          </div>
          <div className="nav-right">
          <div className="dropdown" onMouseLeave={() => this.hideProfile()}>
          <i className="far fa-grin-squint-tears"></i>
          
            <button onMouseEnter={() => this.showProfile()} >Account</button>
            <i className="fas fa-bullhorn" onClick={() => this.showAnnouncements()}></i>
            <i className="fas fa-shopping-cart"></i>
            <div className="dropdown-content-announce" id="my-dropdown-announce" style={displayAnnounce}>
                {announcements}
              </div>
              <div className="dropdown-content" id="my-dropdown" style={display}>
                <Link to='/profile'><p>My Account</p></Link>
                <p onClick={() => this.logout()}>Logout</p>
                <a href={auth0} className="login-dropdown">Login</a>
              </div>
          </div>
          </div>
        </div>
        <div className="main">
          <Routes search={this.state.search} />
        </div>
      </div>
    );
  }
}


export default withRouter(App);
