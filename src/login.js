import React, { Component } from "react";
import * as $ from "jquery";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
  clientSecret
} from "./config_example";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";
import { TextField } from "@rmwc/textfield";
import "@material/button/dist/mdc.button.css";
import Cards from "./cards";
import { Grid, GridCell } from "@rmwc/grid";
import { Icon } from "@rmwc/icon";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArtistSearch from "./artist-search";
import axios from "axios";
import spotifyIcon from "./icon1@2x.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };

  }
  componentDidMount() {
    const { match } = this.props; // coming from React Router.
    console.log(match);
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      window.localStorage.setItem("token", this.state.token);
    }
  }
  

  render() {
    return (
      <div
        className="App"
        style={{
          textAlign: "center",
          alignContent: "center",
          backgroundColor: "white",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%"
        }}
      >
        <div>
          {!this.state.token && (
            <div
              style={{
                width: "50%",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: "12px",
                padding: "30px"
              }}
            >
              <a
                className="btn btn--loginApp-link"
                style={{
                  textDecoration: "none",
                  fontSize: "28px",
                  width: "50%",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign:"center",
                  padding:"12px"
                }}
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login
              </a>
              <img
                src={spotifyIcon}
                style={{
                  width: "28px",
                  position: "absolute",
                  left: "90%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign:"end",
                  padding:"12px"
                }}
              ></img>
            </div>
          )}
          {this.state.token && (
            <div>
              <Switch>
                <Route path="/artist-search" component={ArtistSearch} />
              </Switch>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
