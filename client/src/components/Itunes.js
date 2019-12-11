import React, { Component } from "react";
import axios from "axios";

class Itunes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      results: []
    };
  }

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${this.state.inputValue}&limit=25`
    );
    this.setState({ results: response.data.results });
  };

  buildResultItem = () => {
    return this.state.results.map(item => {
      return (
        <div className="song"
          onClick={e =>
            this.props.history.push(`/itunes/${item.trackId}`, { item })
          }
        >
          {item.collectionName}
        </div>
      );
    });
  };

  signOut = () => {
    sessionStorage.removeItem('user')
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12">
        <h1 style={{ marginTop: "15px" }}>Search for Songs</h1>
        <div className="signUp">
          <a href="/#" onClick={this.signOut}>sign out</a>
        </div>
        <form onSubmit={this.onSubmit} style={{ margin: "100px" }}>
          <input placeholder="Enter here" onChange={this.onInputChange}></input>
          <button type="submit" style={{ marginLeft: "30px" }}>Search Video</button>
        </form>
        {this.state.results.length > 0 && this.buildResultItem()}
      </div>
    );
  }
}

export default Itunes;
