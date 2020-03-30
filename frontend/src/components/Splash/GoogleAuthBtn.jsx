import React, {Component } from 'react';
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

class GoogleAuthBtn extends Component {

    state = {
        flag: false
    };

    renderRedirect = () => {
        console.log(this.flag + "asdfads");
        if (this.state.flag) {
            return <Redirect to='./applicant-viewer'/>
        }
    };

    toggle = ()=> {
        this.setState({
            flag: true
        })
    };

    googleResponse = response => {
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], {
            type: 'application/json'
        });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        this.toggle();
        // fetch('/auth/google', options).then(r => {
        //     r.json().then(user => this.renderRedirect() && console.log(this));
        // });
        fetch('/auth/google', options).then((res) => console.log(res));
    };



    loginFailed = _ => alert('Something went wrong. Please try again');

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2em' }}>
        <GoogleLogin
          clientId="664357147813-mcoqj5m0cc3en7hfdgl9botpie9k4qvm.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={this.googleResponse}
          onFailure={this.loginFailed}
        />
          {this.renderRedirect()}
      </div>
    );

  }
}

export default GoogleAuthBtn;

