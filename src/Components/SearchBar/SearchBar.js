import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super();

    this.state = {
      searchTerm: ''
    }

    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleSearchTerm(e) {
    this.setState({searchTerm: e.target.value});
  }

  submitSearch(e) {
    this.props.searchSpotify(this.state.searchTerm);
  }

  render() {
    return(
      <div className='SearchBar'>
        <input onChange={this.handleSearchTerm} placeholder="Enter A Song, Album, or Artist"/>
        <a onClick={this.submitSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
