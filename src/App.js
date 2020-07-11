import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/home';
import WatchPage from './components/watch';


function App() {
    return (
        <Router>
            <Link to="/">Home</Link>

            <Switch>
                <Route path="/watch/:id">
                    <WatchPage />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

/* ---------- */

export default App;