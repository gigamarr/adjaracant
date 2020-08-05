import React, { useState } from 'react';

/* --------- */
import './styles/episode.scss';
/* --------- */

function Episode(props) {
    const [hovered, setHovered] = useState(false);
    const backgroundImage = props.episode.covers['1920'];
    const { episode: episodeNumber, title } = props.episode;

    return (
        <div className={`episode${props.parentHovered ? ' parent-hovered' : ''}${hovered ? ' self-hovered' : ''}${props.last ? ' last-episode' : ''}`}
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)}
             onClick={() => props.changeSource(episodeNumber)}
        >
            <div className="episode-cover">
                <img src={backgroundImage || '/unavailable.png'} alt="episode-cover"/>
            </div>

            <div className="episode-textual-data">
                <div className="episode-index">
                    Episode. {episodeNumber}
                </div>
                <div className={`episode-title${props.activeEpisode ? ' active' : ''}`} title={title}>
                    {title.length <= 25 ? title : title.slice(0,26) + '...'  || "UNTITLED"}
                </div>
            </div>

        </div>
    )
}


/* --------- */

export default Episode;
