import React, { Component } from 'react';
import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import PlayList from './Components/PlayList/PlayList';
import Spotify from './util/Spotify';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playList: [],
      playListName: 'New playlist'
    }

    this.addToPlayList = this.addToPlayList.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.setPlayListName = this.setPlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
  }

  addToPlayList (track) {
    let tracks = this.state.playList;
    if (tracks.includes(track)){
      return this.setState({playList: tracks});
    } else {
      tracks.push(track);
      this.setState({playList: tracks});
    }
  }

  deleteTrack (trackId) {
    let tracks = this.state.playList;
    tracks = tracks.filter(element => element.id !== trackId);

    this.setState({playList: tracks});
  }

  searchSpotify(searchTerm) {
    Spotify.search(searchTerm).then((tracks) => {
      this.setState({searchResults: tracks});
    });
  }

  setPlayListName(playListName) {
    this.setState({playListName: playListName});
  }

  savePlayList() {
    const playListUris = this.state.playList.map(track => track.uri);
    Spotify.sendPlayList(this.state.playListName, playListUris).then(()=> {
      this.setState({
        playList: [],
        playListName: 'New playlist'
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults trackList={this.state.searchResults}
                           addToPlayList={this.addToPlayList}/>
            <PlayList trackList={this.state.playList}
                      deleteTrack={this.deleteTrack}
                      setPlayListName={this.setPlayListName}
                      savePlayList={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
