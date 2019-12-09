import React, { Component } from "react";
import axios from 'axios';


class Itunes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : '',
      results: []
    };
  }

  onInputChange = (e)=> {
    this.setState({inputValue: e.target.value})
  }

  onSubmit = async (e)=> {
    e.preventDefault()
   const response =  await axios.get(`https://itunes.apple.com/search?term=${this.state.inputValue}&limit=25`)
   this.setState({results: response.data.results})
  }

  buildResultItem = () => {
    return this.state.results.map((item)=>{
      return <div onClick={(e)=>this.props.history.push(`/itunes/${item.trackId}`, {item}) }>{item.collectionName}</div>
    })
  }


  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12">
        <h1>Welcome to itunes search</h1>
        <form onSubmit={this.onSubmit}>
        <input placeholder="Enter here" onChange={this.onInputChange}></input>
        <button type="submit">Search Video</button>
        </form>
        {this.state.results.length > 0 && this.buildResultItem()}
      </div>
    );
  }
}

export default Itunes;
