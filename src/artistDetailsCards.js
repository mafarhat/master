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
export default class ArtistDetailsCards extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="cards" style={{ paddingRight: "12px" }}>
        <Card style={{ width: "16rem",border:"1px solid #e6e6e6" }}>
          <CardPrimaryAction style={{height:"19rem"}}>
            <CardMedia square>
              <CardMediaContent>
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
                  <div layout="row" style={{ padding: "6px 12px 0 12px" }}>
                          <div style={{ fontWeight: "bold", color: "#606c86" }}>
                            {this.props.albumName}
                          </div>
                  </div>
                  <br></br>
                  <div layout="row" style={{ padding: "6px 12px 0 12px" }}>
                    {this.props.artistsName
                      ? this.props.artistsName.map(artistName => (
                          <div style={{ fontSize: "12px" }}>
                            {artistName.name}
                          </div>
                        ))
                      : ""}
                  </div>
                  <br></br>
                  <div
                    style={{
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      fontSize: "12px"
                    }}
                  >
                    {this.props.date ? this.props.date : "date"}{" "}
                  </div>
                  <div
                    style={{
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      fontSize: "12px"
                    }}
                  >
                   {this.props.total_tracks ? this.props.total_tracks : "total_tracks"}&nbsp;tracks
                  </div>
                </div>
              </CardMediaContent>
            </CardMedia>
          </CardPrimaryAction>
          {!this.props.isPackage ? (
            <CardActions style={{ borderTop: "1px solid #e6e6e6" }}>
              <div
                layout="row"
                layout-align="space-between"
                cross-layout-align="center"
              >
                <div />
                <div style={{ paddingLeft: "4px",fontSize:"12px",textAlign:"center", paddingTop:"8px",paddingBottom:"8px", cursor:"pointer" }}>
                  <a href={this.props.onClick} target="_blank" style={{textDecoration:"none", color:"#606c86"}}>Preview on Spotify</a>
                </div>
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
