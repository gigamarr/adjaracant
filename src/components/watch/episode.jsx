import React, { useState } from 'react';

/* --------- */
import './styles/episode.scss';
/* --------- */

function Episode(props) {
    const { episode: episodeNumber, title } = props.episode;
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`episode${hovered ? ' hovered' : ''}${props.active ? ' active-episode' : ''}`} 
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)}
             onClick={() => props.changeSource(episodeNumber)}
        >
            <div className="episode-name">
                Ep. {episodeNumber} - {title || `Episode ${episodeNumber}`}
            </div>

        </div>
    )
}


/* --------- */

export default Episode;
