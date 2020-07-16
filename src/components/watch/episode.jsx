import React, { useState } from 'react';

/* --------- */
import './styles/episode.scss';
/* --------- */

function Episode(props) {
    const [hovered, setHovered] = useState(false);
    const backgroundImage = props.episode.covers['1920'];
    const { episode: episodeNumber, title } = props.episode;

    return (
        <div className={`episode${props.parentHovered ? ' parent-hovered' : ''}${hovered ? ' self-hovered' : ''}`}
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
                <div className="episode-title">
                    {title || "UNTITLED"}
                </div>
            </div>

        </div>
    )
}


/* --------- */

export default Episode;
