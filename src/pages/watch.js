import React from 'react';
import { withRouter } from 'react-router';
import adjaranetService from 'services/adjaranetService';
import VideoPlayer from 'components/videoPlayer';
import NavBar from 'components/navBar';
import slugify from 'services/utilities/slugify';
import Seasons from 'components/watch/seasons';
import Episode from 'components/watch/episode';

/* ---------- */
import './styles/watch.scss';
/* ---------- */


class WatchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            isTvShow: null,
            title: null,
            seasons: null,
            episodes: null,
            activeSeason: 1,
            backgroundImage: null,
            videoJsOptions: null,
            switching: true
        }
    }

    componentDidMount() {

        // getting data for first season/first episode for initial load
        adjaranetService.getData(this.props.match.params.id)
        .then(response => {
            const id = response.data.data.id;
            const matchingTitle = this.matchTitle(response.data.data, this.props.match.params.title);
            const seasonsLength = response.data.data.seasons.data.length;
            const isTvShow = response.data.data.isTvShow;
            const backgroundImage = response.data.data.covers.data['1920'];

            adjaranetService.getFiles(id)
            .then(response => {
                
                const firstEpisodeSources = this.getEpisodeSources(response.data.data)

                this.setState({
                    episodes: response.data.data,
                    id: id,
                    title: matchingTitle,
                    seasons: seasonsLength,
                    isTvShow: isTvShow,
                    backgroundImage: backgroundImage,
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
                        sources: firstEpisodeSources
                    }
                })
            })
        })

    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                {this.state.videoJsOptions && (
                    <VideoPlayer {...this.state.videoJsOptions} backgroundImage={this.state.backgroundImage} title={this.state.title} />
                )}

                {this.state.isTvShow && this.state.episodes && (
                    <React.Fragment>
                        <Seasons seasons={Array(this.state.seasons).fill('season')}
                                activeSeason={this.state.activeSeason}
                                changeSeason={this.changeSeason}
                        />

                        <div id="episodes-container">
                            {this.state.episodes.map((episode, index) => {
                                return <Episode key={index} episode={episode} changeSource={this.changeSource} />
                            })}
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }

    changeSource = (episodeIndex) => {
        console.log("changing source to", episodeIndex)
    }

    matchTitle(data, slug) {
        const { originalName, primaryName, secondaryName, tertiaryName } = data;
        const matchingTitles = [originalName, primaryName, secondaryName, tertiaryName].filter(title => slugify(title) === slug);
        return matchingTitles[0] || 'title not matched';
    }

    getEpisodeSources(episodes, index=0) {

        /*  index is the index of an episode, by default, if source is movie, there will be only one index, which is 0
            if it is a TV show with multiple episodes, we will change the index attribute accordingly, but regardless of the
            content type, we want to grab `0` index on page load first.

            both season with value '0' and with value '1' return first season.
            
        */

        const sources = []

        episodes[index].files.forEach(element => {
            
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

    changeSeason = (seasonIndex) => {
        const activeSeason = seasonIndex
        const episodes = []

        adjaranetService.getFiles(this.state.id, seasonIndex)
        .then(response => {
            response.data.data.forEach(episode => {
                episodes.push(episode)
            })

            this.setState({
                episodes,
                activeSeason
            })
        })

    }
}

/* ---------- */

export default withRouter(WatchPage);