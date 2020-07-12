import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/home';
import WatchPage from './pages/watch';
import Footer from 'components/footer';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName: ''
        }
    }

    setTitle = (movieName) => {
        this.setState({
            movieName
        })
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/watch/:id">
                            <WatchPage movieName={this.state.movieName} />
                        </Route>

                        <Route path="/">
                            <Home  getTitle={this.setTitle} />
                        </Route>
                    </Switch>
                </Router>

                <Footer />
                
            </React.Fragment>
        )
    }
}

/* ---------- */

export default App;