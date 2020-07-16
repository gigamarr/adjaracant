import React from 'react';
import Season from './season';

/* ---------- */
import './styles/seasons.scss';
/* ---------- */

function Seasons(props) {
    return (
        <div id="seasons-container">
            {props.seasons.map((_, index) => (
                <Season key={index} 
                        changeSeason={props.changeSeason} 
                        season={index+1} 
                        active={props.activeSeason === index+1}
                />
            ))}
        </div>
    )
}

/* ---------- */

export default Seasons;