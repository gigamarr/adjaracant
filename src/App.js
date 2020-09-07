import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/home';
import WatchPage from './pages/watch';
import Footer from 'components/footer';
import NotFound from './pages/404';

function App() {
    return (
        <React.Fragment>
            <div id="wrapper">
                <Router>
                    <Switch>
			<Route path="/404">
				<NotFound />
			</Route>

                        <Route path="/watch/:id/:title">
                            <WatchPage />
                        </Route>

                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>

            <Footer />
        </React.Fragment>
    )
}

/* ---------- */

export default App;
