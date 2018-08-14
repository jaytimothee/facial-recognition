import React, { Component } from "react";

export default class Register extends Component {
  state = {
    registerEmail: "",
    registerPassword: "",
    registerName: ""
  };

  onEmailChange = e => {
    this.setState({ registerEmail: e.target.value });
  };

  onPassWordChange = e => {
    this.setState({ registerPassword: e.target.value });
  };

  onNameChange = e => {
    this.setState({ registerName: e.target.value });
  };

  onSignInSubmit = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.registerName
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data === "unable to register"){
          return console.log('unable to register')
        }
        if (data) {
          this.props.onRouteChange("signIn");
        }
      });
  };

  render() {
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPassWordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSignInSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}
