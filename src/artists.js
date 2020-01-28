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
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import ArtistSearch from "./artist-search";
import ArtistDetails from "./artist-details";
class Artists extends React.Component {
  loginRequest = { email: "", password: "" };

  constructor() {
    super();
    this.state = {
      artists: "",
      token: null,
      loginRequest: this.loginRequest
    };
    this.getSearch = this.getSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    if (target.value) {
      this.getSearch(target.value);
      window.localStorage.setItem("searchValue", target.value);
    }
    const name = target.name;
    let login = { ...this.state.loginRequest, [name]: value };
    this.setState({ loginRequest: login });
  }
  componentDidMount() {
    window.localStorage.removeItem("path");
    window.localStorage.removeItem("searchKey");
    if (!window.localStorage.token) {
      this.props.history.push("/login");
    }
    console.log("this.props.match.param", this.props.match);
    if (
      window.localStorage.token &&
      this.props.match.path == "/" &&
      this.props.match.isExact
    ) {
      this.props.history.push("/artist-search");
    }
  }
  getSearch(quary) {
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=" + quary + "&type=artist",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: artists => {
        this.setState({ artists: artists });
        console.log("this.artists", this.state.artists);
      },
      error: res=>{
        this.props.history.push("/login")
      }
    });
  }
  render() {
    const { match } = this.props; // coming from React Router.

    console.log(match.path); // /topics/:topicId/:subId

    console.log(match.url); // /topics/react-router/url-parameters
    if (this.state.isloading) {
      return (
        <div
          flex="100"
          layout="row"
          flex-gt-sm="100"
          layout-align="center"
          style={{ marginTop: "10%" }}
        >
          <div flex="45" />
          <div flex="55">loading</div>
        </div>
      );
    } else {
      return (
        <div className="home" style={{display: "block",width:"90%", marginLeft: "auto", marginRight: "auto" }}>
          <Route path="/artist-search" component={ArtistSearch} />
          <Route path="/artist-details/:id" component={ArtistDetails} />
        </div>
      );
    }
  }
}
export default withRouter(Artists);
