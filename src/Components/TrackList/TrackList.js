import React, { Component } from 'react';
import './TrackList.css'

import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.trackList.map(track => {
            return <Track track={ track }
                          key={track.id}
                          addToPlayList={this.props.addToPlayList}
                          deleteTrack={this.props.deleteTrack}
                          inPlayList={this.props.inPlayList}/>
          })
        }
      </div>
    );
  }
}

export default TrackList;
