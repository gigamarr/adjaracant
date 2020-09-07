import React, { Component } from 'react';
import NavBar from 'components/navBar';

import './styles/404.scss';

export default class NotFound extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />

				<div id="message-404">
					<p>Couldn't find anything, it is adjaranet's fault.</p> 
					<img src="404.png" alt="404-logo" style={{height: '8vw', width: '9vw'}}/>
				</div>
			</React.Fragment>
		)
	}
}
