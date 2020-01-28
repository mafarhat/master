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
import ArtistDetailsCards from "./artistDetailsCards";
import { Grid, GridCell } from "@rmwc/grid";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
class ArtistDetails extends React.Component {
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
    const { match } = this.props; // coming from React Router.
    window.localStorage.setItem("path","/artist-details/:id")
    console.log(match);
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
    console.log("match", this.props.match.params.id);
    this.getSearch(this.props.match.params.id);
  }
  getSearch(id) {
    const { match } = this.props;
    console.log("window.localStorage.token", window.localStorage.token);
    console.log("match", match);
    $.ajax({
      url: "https://api.spotify.com/v1/artists/" + id + "/albums",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.token
        );
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
          <Grid
            style={{
              display: "block",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {this.state.artists
              ? this.state.artists.items.map(item => (
                  <GridCell span={3} tablet={4} key="index">
                    <ArtistDetailsCards
                      courseImageUrl={
                        item &&
                        item.images.length > 0 &&
                        item.images[0] &&
                        item.images[0].url
                          ? item.images[0].url
                          : ""
                      }
                      albumName={item.name}
                      artistsName={item.artists}
                      date={item.release_date ? item.release_date : ""}
                      total_tracks={item.total_tracks ? item.total_tracks : ""}
                      rating={item.popularity / 20}
                      onClick={item.external_urls.spotify}
                    />
                  </GridCell>
                ))
              : ""}
          </Grid>
        </div>
      );
    }
  }
}
export default withRouter(ArtistDetails);
