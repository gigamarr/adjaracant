import React from 'react';
import { withRouter } from 'react-router';
// import adjaranetService from 'services/adjaranetService';
import VideoPlayer from 'components/videoPlayer';


class WatchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoJsOptions: {
                autoplay: false,
                controls: true,
                sources: [{
                    src: "https://api.adjaranet.com/api/v1/movies/2515/files/353540?source=adjaranet",
                    type: "video/mp4"
                }]
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <VideoPlayer {...this.state.videoJsOptions}/>
            </React.Fragment>
        )
    }
}

/* ---------- */

export default withRouter(WatchPage);