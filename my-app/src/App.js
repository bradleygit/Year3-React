import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Schedule from './Components/Schedule.js'
import Admin from './Components/Admin.js'
import Authors from './Components/Authors.js'


function App() {
    return (
        <Router basename="/KF6012/part2">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Schedule</Link>
                    </li>
                    <li>
                        <Link to="/authors">Authors</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
            </nav>
            <div className="App">
                <Switch>
                    <Route path="/admin">
                        <h1 className="Title">Admin</h1>
                        <Admin/>
                    </Route>
                    <Route exact path="/">
                        <h1 className="Title">Schedule</h1>
                        <Schedule/>
                    </Route>
                    <Route exact path="/authors">
                        <h1 className="Title">Authors</h1>
                        <Authors/>
                    </Route>
                    <Route path="*">
                        <h1 className="Title">404 Page Not Found</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );

}

export default App;