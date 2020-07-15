import React, { useState } from 'react';

/* --------- */
import './styles/episode.scss';
/* --------- */

function Episode(props) {
    const { episode: episodeNumber, title } = props.episode;
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`episode${hovered ? ' hovered' : ''}`} 
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)}
             onClick={() => props.changeSource(episodeNumber)}
        >
            <div className="episode-name">
                Ep. {episodeNumber} - {title || 'title not found'}
            </div>

        </div>
    )
}


/* --------- */

export default Episode;
