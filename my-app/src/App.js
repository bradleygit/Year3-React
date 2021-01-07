import React from 'react';
import './App.css';

class Session extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        }
    }

    render(){
        console.log();
        return (
            <div className="Session">
                <p>{this.state.data.type}</p>
            </div>
        );
    }
}

class Day extends React.Component{

    handleDayClick = () => {
        this.setState({displayData:!this.state.displayData})
    }


    componentDidMount(){
        this.setState({day:this.props.day})
        let url = "http://localhost/Assignment3/api/schedule?day="+this.state.day;
        this.fetchFromURL(url);
    }


    fetchFromURL = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({data:data.data})
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
            day:this.props.day,
            displayData:false,
            data:[]
        }
    }
    render(){
        return (
            <div className="Day">
                <h2 onClick={this.handleDayClick}>{this.props.day}</h2>
                {this.state.displayData ? this.state.data.map((data,i)=>(<Session key={i} data={data}/>)) : ""}
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
        <div className="App">
            <h1 className="Title">Schedule</h1>
            <Schedule/>
        </div>
    );
}

export default App;