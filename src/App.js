import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/home';
import WatchPage from './pages/watch';
import Footer from 'components/footer';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/watch/:id/:title">
                        <WatchPage />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>

            <Footer />
            
        </React.Fragment>
    )
}

/* ---------- */

export default App;