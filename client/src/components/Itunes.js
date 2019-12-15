import React, { Component } from "react";
import axios from "axios";

class Itunes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      results: [],
      resultsTopTen: [],
      errorInput: false
    };
  }

  onInputChange = e => {
    this.setState({ inputValue: e.target.value, errorInput: false });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.inputValue !== '') {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${this.state.inputValue}&limit=25`
      );
      this.setState({ results: response.data.results, resultsTopTen: [] });
      axios.post("/api/songs/insertSong", {
        songName: this.state.inputValue
      });
    }
    else this.setState({ errorInput: true, resultsTopTen: [] });
  };

  buildResultItem = () => {
    return this.state.results.map(item => {
      return (
        <div
          className="song"
          onClick={e =>
            this.props.history.push(`/itunes/${item.trackId}`, { item })
          }
        >
          {item.collectionName}
        </div>
      );
    });
  };

  buildResultTopTen = () => {
    return this.state.resultsTopTen.map(item => {
      return <div className="songTopTen"> Name: {item.songName} , counts of searches: {item.songCounter}</div>;
    });
  };

  getTopTen = async e => {
    e.preventDefault();
    const response = await axios.get("/api/songs/top10");
    console.log(response.data.list)
    this.setState({ resultsTopTen: response.data.list, results: [] });
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
        <form onSubmit={this.onSubmit} style={{ marginLeft: "160px" }}>
          <input placeholder="Enter here" onChange={this.onInputChange}></input>
          <button type="submit" style={{ margin: "30px" }}>
            Search Video
          </button>
          <button onClick={this.getTopTen}>Top 10</button>
        </form>
        {this.state.errorInput &&
          <div className="error">
            please enter an input for search
              </div>
        }
        {this.state.results.length > 0 && this.buildResultItem()}
        {this.state.resultsTopTen.length > 0 && this.buildResultTopTen()}
      </div>
    );
  }
}

export default Itunes;

