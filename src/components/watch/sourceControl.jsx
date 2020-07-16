import React, { useState } from 'react';
import Seasons from 'components/watch/seasons';
import Episode from 'components/watch/episode';
import Loader from 'components/loader';


/* ---------- */
import './styles/sourceControl.scss';
/* ---------- */


function SourceControl(props) {
    const [hovered, setHovered] = useState(false);

    return (
        <React.Fragment>
        <Seasons seasons={Array(props.seasons).fill('season')}
                activeSeason={props.activeSeason}
                changeSeason={props.changeSeason}
        />



        <div id="episodes-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {props.loading && (
                <div id="loader-container">
                    <Loader />
                </div>
            )}

            {!props.loading && (
                <React.Fragment>
                    {props.episodes.map((episode, index) => {
                        return <Episode key={index} 
                                        episode={episode}
                                        changeSource={props.changeSource}
                                        parentHovered={hovered}
                                />
                    })}
                </React.Fragment>
            )}
        </div>
    </React.Fragment>
    )
}

/* ---------- */

export default SourceControl;