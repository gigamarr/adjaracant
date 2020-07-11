import React from 'react';
import { withRouter } from 'react-router';
import adjaranetService from 'services/adjaranetService';


class WatchPage extends React.Component {
    componentDidMount() {
        adjaranetService.getData(this.props.match.params.id)
        .then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <h4>you are now watching {this.props.match.params.id}</h4>
        )
    }
}

/* ---------- */

export default withRouter(WatchPage);