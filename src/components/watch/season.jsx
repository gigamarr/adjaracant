import React from 'react';

/* ---------- */
import './styles/season.scss';
/* ---------- */

function Season(props) {
    return (
        <div className={`season${props.active ? ' active' : ''}`} onClick={() => props.changeSeason(props.season)}>
            Season {props.season}
        </div>
    )
}
/* ---------- */

export default Season;