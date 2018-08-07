import React from 'react';
import './login.css'

export default function Login () {
    const auth0 = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&response_type=code&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/callback`)}`
    return (
        <div className="login">
            <div className="stuff">
                <h1>Please Login</h1>
                <a href={auth0}><button>Login</button></a>
            </div>
        </div>
    )
}