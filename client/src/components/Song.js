import React, { Component } from "react";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.history.location.state.item
    };
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12">
        <h1 style={{ marginTop: "15px" }}>{this.state.item.collectionName}</h1>
        <div className="viewSong">
          {this.state.item.previewUrl ? (
            <iframe
              title="aa"
              src={this.state.item.previewUrl}
              height="200"
              width="300"
              allow='autoplay'
            ></iframe>
          ) : (
              "No prevURL found"
            )}
        </div>

      </div>
    );
  }
}

export default Song;
