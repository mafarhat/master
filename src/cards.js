import React from "react";
import "@material/button/dist/mdc.button.css";
import "./cards.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import yellowStar from "./yellow-star.png";
import yellowStarEmpty from "./yellow-star-empty.png";
import courseImage from "./courseImage.jpeg";
import Rating from "react-rating";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionIcon,
  CardActionIcons,
  CardMediaContent
} from "@rmwc/card";
export default class Cards extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="cards" style={{ paddingRight: "12px", height:"16rem" }}>
        <Card style={{ width: "16rem",height:"100%",border:"1px solid #e6e6e6" }}>
          <CardPrimaryAction>
            <CardMedia square>
              <CardMediaContent onClick={this.props.onClick}>
                <div layout="column">
                  <div>
                    <img
                      src={
                        this.props.courseImageUrl
                          ? this.props.courseImageUrl
                          : courseImage
                      }
                      style={{ height: "130px", width: "100%" }}
                    />
                  </div>
                  <div
                    layout="row"
                    style={{ padding: "6px 12px 0 12px" }}
                  >
                    <div style={{ fontWeight: "bold", color: "#606c86", textAlign:"start" }}>
                      {this.props.artistName}
                    </div>
                  </div>
                  <div
                    style={{
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      fontSize: "12px",
                      textAlign:"start"
                    }}
                  >
                    {this.props.followers
                      ? this.props.followers
                      : "followers"} &nbsp; followes
                  </div>
                  <br></br>
                </div>
              </CardMediaContent>
            </CardMedia>
          </CardPrimaryAction>
          {!this.props.isPackage ? (
            <CardActions>
              <div
                layout="row"
                layout-align="space-between"
                cross-layout-align="center"
              >
                <div />
                <div style={{ paddingLeft: "12px",
                      paddingRight: "12px", textAlign:"start" }}>
                  <Rating
                    initialRating={this.props.rating}
                    placeholderRating={this.props.rating}
                    readonly
                    emptySymbol={
                      <img src={yellowStarEmpty} style={{ width: "12px" }} />
                    }
                    placeholderSymbol={
                      <img
                        src={yellowStarEmpty}
                        className="icon"
                        style={{ width: "12px" }}
                      />
                    }
                    fullSymbol={
                      <img
                        src={yellowStar}
                        className="icon"
                        style={{ width: "12px" }}
                      />
                    }
                  />
                </div>
                <br></br>
              </div>
            </CardActions>
          ) : (
            ""
          )}
        </Card>
      </div>
    );
  }
}