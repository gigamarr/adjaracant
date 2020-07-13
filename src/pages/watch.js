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
                
                const sources = this.getEpisodeSources(response)


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
                                "qualitySelector",
                                "fullscreenToggle"
                            ]
                        },
                        // sources: [
                        //     {
                        //         src: response.data.data[0].files[0].files[0].src,
                        //         type: "video/mp4",
                        //         label: '720'
                        //     },

                        //     {
                        //         src: response.data.data[0].files[0].files[0].src,
                        //         type: "video/mp4",
                        //         label: '480'
                        //     }
                        // ]
                        sources
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

    getEpisodeSources(response, index=0) {

        /*  index is the index of an episode, by default, if source is movie, there will be only one index, which is 0
            if it is a TV show with multiple episodes, we will change the index attribute accordingly, but regardless of the
            content type, we want to grab `0` index on page load first. */

        const sources = []

        response.data.data[index].files.forEach(element => {
            
            element.files.forEach(file => {
                sources.push({
                    src: file.src, 
                    quality: file.quality, 
                    label: `${element.lang} - ${file.quality}`,
                    type: "video/mp4"
                })
            })

        })

        return sources;
    }
}

/* ---------- */

export default withRouter(WatchPage);