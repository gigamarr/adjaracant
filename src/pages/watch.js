import React from 'react';
import { withRouter } from 'react-router';
import adjaranetService from 'services/adjaranetService';
import VideoPlayer from 'components/videoPlayer';
import NavBar from 'components/navBar';

/* ---------- */
import './styles/watch.scss';
/* ---------- */


class WatchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoJsOptions: null,
            movieDetails: null        
        }
    }

    componentDidMount() {
        adjaranetService.getData(this.props.match.params.id)
        .then(response => {
            adjaranetService.getFiles(response.data.data.id)
            .then(response => {
                this.setState({
                    videoJsOptions: {
                        autoplay: false,
                        controls: true,
                        sources: [{
                            src: response.data.data[0].files[0].files[0].src,
                            type: "video/mp4"
                        }]
                    },
                    movieDetails: response
                })
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                {this.state.videoJsOptions && (
                    <VideoPlayer {...this.state.videoJsOptions} movieDetails={this.state.movieDetails} title={this.props.movieName} />
                )}
            </React.Fragment>
        )
    }
}

/* ---------- */

export default withRouter(WatchPage);