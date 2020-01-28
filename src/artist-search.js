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
class ArtistSearch extends React.Component {
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
      window.localStorage.setItem("searchKey", target.value);
    }
    const name = target.name;

    let login = { ...this.state.loginRequest, [name]: value };
    this.setState({ loginRequest: login });
  }
  componentDidMount() {
    console.log("this", this.props);
    const { match } = this.props; // coming from React Router.
    console.log(match);
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      console.log("this.props.history", this.props);
      window.localStorage.setItem("token", _token);
    }
    if(window.localStorage.path == "/artist-details/:id" &&
    window.localStorage.searchKey){
      this.getSearch(window.localStorage.searchKey);
    }
  }

  getSearch(quary) {
    console.log("window.localStorage.token", window.localStorage.token);
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
        error:err=>{
          if(err.status==401){
            this.props.history.push("/login")
          }
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
        <div
          className="home"
          style={{
            display: "block",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(231, 229, 214)",
              padding: "12px 12px 12px 12px",
              border: "1px solid #e6e6e6"
            }}
          >
            Spotify Artist Search
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div class="input-group mb-3">
              <input
                style={{
                  height: "40px",
                  width: "75%",
                  textAlign: "center",
                  borderRadius: "12px",
                  fontSize: "20px"
                }}
                type="text"
                class="form-control"
                name="email"
                placeholder="Search for An Artist"
                onChange={this.handleInputChange}
                value={this.state.loginRequest.email}
              />
            </div>
            <Grid>
              {this.state.artists && this.state.artists.artists
                ? this.state.artists.artists.items.map(item => (
                    <GridCell span={3} key="index">
                      <Cards
                        courseImageUrl={
                          item &&
                          item.images.length > 0 &&
                          item.images[0] &&
                          item.images[0].url
                            ? item.images[0].url
                            : ""
                        }
                        artistName={item.name}
                        followers={item.followers.total.toLocaleString()}
                        rating={item.popularity / 20}
                        onClick={() => {
                          console.log("hello");
                          this.props.history.push("/artist-details/" + item.id);
                        }}
                      />
                    </GridCell>
                  ))
                : ""}
            </Grid>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(ArtistSearch);
