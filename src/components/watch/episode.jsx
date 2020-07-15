import React from 'react';

/* --------- */
import './styles/episode.scss';
/* --------- */

function Episode(props) {
    const { episode: episodeNumber, title } = props.episode;
    return (
        <div className="episode">
            Ep. {episodeNumber} - {title || 'title not found'}
        </div>
    )
}


/* --------- */

export default Episode;
