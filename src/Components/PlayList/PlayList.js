import React, { Component } from 'react';
import './PlayList.css';

import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.props.setPlayListName(e.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input onChange={this.handleChange} value={this.props.defaultValue}/>
        <TrackList trackList={this.props.trackList}
                   deleteTrack={this.props.deleteTrack}
                   inPlayList={true}/>
        <a onClick={this.props.savePlayList} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
