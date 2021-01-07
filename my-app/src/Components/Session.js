import React from 'react';
/**
 * Component renders each of the days sessions
 *
 * @author Bradley Slater
 */

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
                <p>Session Name: {this.state.data.name}<div className="SessionDetails"> Time Start: {formatTime(true,this.state.data.startHour) +":"+ formatTime(false,this.state.data.startMinute)} End Time: {formatTime(true,this.state.data.endHour) +":"+ formatTime(false,this.state.data.endMinute)}  </div></p>

                </div>
        );
    }

}

function formatTime(isHour,time){
    if(isHour){
        if(time<10){
            return "0"+time;
        }
        return time;
    }
    else{
        if(time<10){
            return time +"0";
        }
        return time;
    }
}
export default Session;