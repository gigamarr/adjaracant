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
        <Router>
            <Switch>
                <Route path="/watch/:id">
                    <WatchPage />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>

            <Footer />
        </Router>
    )
}

/* ---------- */

export default App;