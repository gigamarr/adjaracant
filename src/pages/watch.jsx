import React from 'react';
import { withRouter } from 'react-router';
import adjaranetService from 'services/adjaranetService';
import VideoPlayer from 'components/videoPlayer';
import NavBar from 'components/navBar';
import Checkbox from 'components/checkbox';
import SourceControl from 'components/watch/sourceControl';

/* ---------- */
import './styles/watch.scss';
/* ---------- */

class WatchPage extends React.Component {
    constructor(props) {
        super(props)
        this.player = React.createRef()
        this.state = {
            id: null,
            isTvShow: null,
            seasons: null,
            episodes: null,
            activeSeason: 1,
            activeEpisode: 0,
            backgroundImage: null,
            videoJsOptions: null,
            episodesLoading: false,
            autoSwitchEpisodes: false
        }
    }

    async componentDidMount() {
        // There are no lifecycle methods after componentDidMount so it is safe to use  async/await here

        const metaInformation = await adjaranetService.getMetaInformation(this.props.match.params.id)
	const episodes = await adjaranetService.getEpisodes(metaInformation.id, metaInformation.isTvShow ? '1':'0')
        const firstEpisodeSources = this.getAllSingleEpisodeSources(episodes)

        this.setState({

            ...metaInformation,
            episodes,
            videoJsOptions: {
                autoplay: false,
                controls: true,
                controlBar: {
                    children: [
                        "playToggle",
                        "progressControl",
                        "remainingTimeDisplay",
                        "volumePanel",
                        "qualitySelector",
                        "fullscreenToggle"
                    ]
                },
                sources: firstEpisodeSources
            }

        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />

                {this.state.videoJsOptions && (
                    <VideoPlayer 
                        ref={this.player} 
                        {...this.state.videoJsOptions} 
                        backgroundImage={this.state.backgroundImage}
                        autoplayEpisodes={this.state.autoSwitchEpisodes}
                        activeEpisode={this.state.activeEpisode}
                        episodes={this.state.episodes}
                        changeSource={this.changeSource}
                    />
                )}


                {this.state.isTvShow && this.state.episodes && (
                    <React.Fragment>
                        <div className="player-options">
                            <Checkbox checked={this.state.autoSwitchEpisodes} onClick={() => this.setState({autoSwitchEpisodes: !this.state.autoSwitchEpisodes})} />
                            <p className={this.state.autoSwitchEpisodes ? 'active' : ''}>Autoswitch Eps.</p>
                        </div>

                        <SourceControl
                            seasons={this.state.seasons}
                            activeSeason={this.state.activeSeason}
                            activeEpisode={this.state.activeEpisode}
                            episodes={this.state.episodes}
                            changeSeason={this.changeSeason}
                            changeSource={this.changeSource}
                            loading={this.state.episodesLoading}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }


    getAllSingleEpisodeSources(episodes, index=0) {
        if (typeof episodes[index] !== "undefined") {
            const sources = []

            episodes[index].files.forEach(episode => {
                const episodeSources = this.parseEpisodeSources(episode)
                sources.push(...episodeSources)
            })

            return sources   
        }
    }


    parseEpisodeSources(episode) {
        let sources = []
        episode.files.forEach(file => {
            sources.push({
                src: file.src,
                quality: file.quality,
                label: `${episode.lang} - ${file.quality}`,
                type: "video/mp4"
            })
        })

        return sources
    }

    changeSource = (episodeIndex) => {
        const sources = this.getAllSingleEpisodeSources(this.state.episodes, episodeIndex-1)
        this.player.current.changeSource(sources)
        this.setState({
            activeEpisode: episodeIndex-1
        })
    }

    changeSeason = async (seasonIndex) => {
        if (seasonIndex !== this.state.activeSeason) {
            this.setState({
                episodesLoading: true
            })
    
            const activeSeason = seasonIndex
            const episodes = await adjaranetService.getEpisodes(this.state.id, seasonIndex)
	    
            this.setState({
                episodes,
                activeSeason,
                episodesLoading: false
            })
	
            this.changeSource(1)
        }
    }
}

/* ---------- */

export default withRouter(WatchPage);
