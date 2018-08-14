import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./Component/navigation/Navigation";
import Logo from "./Component/logo/Logo";
import Rank from "./Component/Rank/Rank";
import ImageLinkForm from "./Component/image-link/ImageLinkForm";
import FaceRecognition from "./Component/FaceRecognition/FaceRecognition";
import SignIn from "./Component/signIn/SignIn";
import Register from "./Component/Register/Register";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 400
      }
    }
  },

  styles: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "-1"
  }
};

const app = new Clarifai.App({ apiKey: "f314ea0d14b444f8ad2f9bd162c49c58" });

class App extends Component {
  state = {
    input: "",
    imgUrl: "",
    box: {},
    route: "signIn",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: new Date()
    }
  };
  reset() {
    this.setState(
      Object.assign(this.state.user, {
        input: "",
        imgUrl: "",
        box: {},
        route: "signIn",
        isSignedIn: false
      })
    );
  }

  loadUser = data => {
    this.reset();
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  detectFace = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input_img");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayBox = box => {
    this.setState({ box });
  };

  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayBox(this.detectFace(response));
      })

      .catch(err => console.log(err, "didnt work"));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} style={particleOptions.styles} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition url={this.state.imgUrl} box={this.state.box} />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : this.state.route === "signout" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
