import React, { Component } from 'react';
import './Track.css'

class Track extends Component {
  constructor(props){
    super(props);

    this.addOnClick = this.addOnClick.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);

  };

  addOnClick(e) {
    this.props.addToPlayList(this.props.track);
  }

  deleteOnClick(e) {
    this.props.deleteTrack(this.props.track.id);
  }

  renderButton() {
    if (this.props.inPlayList) {
      return <a className="Track-action" onClick={this.deleteOnClick}>-</a>
    } else {
      return <a className="Track-action" onClick={this.addOnClick}>+</a>
    }
  }

  render() {
    return(
      <div className="Track">
        <div key={this.props.track.id} className="Track-information">
          <h3>{this.props.track.songname}</h3>
          <p>{this.props.track.name} | {this.props.track.album}</p>
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

export default Track;
