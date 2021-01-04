import React from 'react';
import './App.css';



class Day extends React.Component{
    state = {
        displayData:false
    }

    handleDayClick = () => {
        this.setState({displayData:!this.state.displayData})
    }

    render(){
        let additionalData = "";
        if (this.state.displayData) {
            additionalData = <h1>Test!</h1>
        }
        return (
            <div className="Day">
                <h2 onClick={this.handleDayClick}>{this.props.day}</h2>
                {additionalData}
            </div>
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