import Day from "./Day";
import React from 'react';


/**
 * Manages each of the 4 scheduled days
 *
 * @author Bradley Slater
 */
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

export default Schedule;