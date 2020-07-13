import React from 'react';
import { withRouter } from 'react-router';
import adjaranetService from 'services/adjaranetService';
import VideoPlayer from 'components/videoPlayer';
import NavBar from 'components/navBar';
import slugify from 'services/utilities/slugify';

/* ---------- */
import './styles/watch.scss';
/* ---------- */


class WatchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoJsOptions: null,
            movieDetails: null,
            title: null // is contained in the `movieDetail` but goal is to display title the way user searched it on home page
        }
    }

    componentDidMount() {
        adjaranetService.getData(this.props.match.params.id)
        .then(response => {
            const matchingTitle = this.matchTitle(response, this.props.match.params.title);
            this.setState({
                title: matchingTitle
            })

            adjaranetService.getFiles(response.data.data.id)
            .then(response => {
                this.setState({
                    videoJsOptions: {
                        autoplay: false,
                        controls: true,
                        controlBar: {
                            children: [
                                "playToggle",
                                "volumePanel",
                                "progressControl",
                                "remainingTimeDisplay",
                                "fullscreenToggle"
                            ]
                        },
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
                    <VideoPlayer {...this.state.videoJsOptions} movieDetails={this.state.movieDetails} title={this.state.title} />
                )}
            </React.Fragment>
        )
    }

    matchTitle(response, slug) {
        const { originalName, primaryName, secondaryName, tertiaryName } = response.data.data;
        const matchingTitles = [originalName, primaryName, secondaryName, tertiaryName].filter(title => slugify(title) === slug);
        return matchingTitles[0] || 'title not matched';
    }
}

/* ---------- */

export default withRouter(WatchPage);