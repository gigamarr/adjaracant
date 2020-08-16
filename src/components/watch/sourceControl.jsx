import React from 'react';
import Seasons from 'components/watch/seasons';
import Episodes from 'components/watch/episodes';
import Loader from 'components/loader';

/* ---------- */
import './styles/sourceControl.scss';
/* ---------- */

function SourceControl(props) {
	return (
		<React.Fragment>
			<Seasons seasons={Array(props.seasons).fill('season')}
				 activeSeason={props.activeSeason}
				 changeSeason={props.changeSeason}
			/>

			{props.loading && (
				<div className="loading">
					<Loader />
				</div>
			)}
			

			{!props.loading && (
				<Episodes
					episodes={props.episodes}
					changeSource={props.changeSource}
					activeEpisode={props.activeEpisode}
				/>
			)}
		</React.Fragment>
	)
}

/* ---------- */

export default SourceControl;
