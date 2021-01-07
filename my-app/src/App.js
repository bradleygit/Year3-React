import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Schedule from './Components/Schedule.js'
import Admin from './Components/Admin.js'


function test() {

    let myJSON = {"username": "John", "password": "top_secret!"};
    const postJSON = (api, json) => {
        fetch(api, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(json)
        })
            .then(
                function (response) {
                    return response.json();
                })
            .then(
                function (data) {
                    console.log(data);
                })
            .catch(function (err) {
                    console.log("Something went wrong!", err);
                }
            );
    }
}


function App() {
    return (

        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Schedule</Link>
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
                    <Route path="*">
                        <h1 className="Title">404 Page Not Found</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );

}

export default App;