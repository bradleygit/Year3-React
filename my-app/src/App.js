import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div className="Session">
                <p>Session Type: {this.state.data.type} Session Name: {this.state.data.name}</p>
            </div>
        );
    }
}

class Day extends React.Component {

    handleDayClick = () => {
        this.setState({displayData: !this.state.displayData})
    }


    componentDidMount() {
        this.setState({day: this.props.day})
        let url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/schedule?day=" + this.state.day;
        this.fetchFromURL(url);
    }


    fetchFromURL = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                    return [];
                }
            );
    }


    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            displayData: false,
            data: []
        }
    }

    render() {
        return (
            <div className="Day">
                <h2 onClick={this.handleDayClick}>{this.props.day}</h2>
                {this.state.displayData ?
                    <div className="DaySession">
                        {this.state.data.map((data, i) => (<Session key={i} data={data}/>))}
                    </div>
                    : ""}

            </div>
        );

    }

}

function test(){

    let myJSON = {"username":"John", "password":"top_secret!"};
    const postJSON = (api,json) => {
        fetch(api, {
            method: 'POST',
            headers : new Headers(),
            body:JSON.stringify(json)})
            .then(
                function (response) {
                    return response.json();
                })
            .then(
                function(data) {
                    console.log(data);
                })
            .catch(function (err) {
                    console.log("Something went wrong!", err);
                }
            );
    }


}

class Schedule extends React.Component{

    render(){
        const days = ["Monday","Tuesday","Wednesday","Thursday"]
        return(
            <div className="daysContainer">
            {days.map((day,i)=>(<Day key={i} day={day} />))}
        </div>
        );
    }
}


function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/">
                        <h1 className="Title">Schedule</h1>
                        <Schedule/>
                    </Route>
                    <Route path="/admin">
                        <h1 className="Title">Admin</h1>
                    </Route>
                    <Route path="*">
                        404 Not Found
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;