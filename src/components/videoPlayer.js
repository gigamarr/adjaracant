import React, { Component } from 'react';
import videojs from 'video.js';

/* ---------- */
import './styles/videoPlayer.scss';
/* ---------- */

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundImage: this.props.movieDetails.data.data[0].covers['1920'],
            name: this.props.title
        }
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.props)
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div id="video-player-container" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.state.backgroundImage})`}}>
                
                <div data-vjs-player>
                    <video ref={ node => this.videoNode = node } className="video-js"></video>
                </div>

                <div className="movie-title">
                    <h3>{this.state.name}</h3>
                </div>
            </div>
        )
    }
}

/* ---------- */

export default VideoPlayer;