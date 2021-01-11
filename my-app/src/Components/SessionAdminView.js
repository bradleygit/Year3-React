import React from 'react';


/**
 * Manages session data
 *
 * @author Bradley Slater
 */

class SessionAdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }


    render() {
        return (
            <div className="Session">
                <p>Session Name: {this.state.data.sessionName} </p><p>Session ID: {this.state.data.sessionId}</p>
                <div className="SessionDetails"><p>Author Chair: {this.state.data.authorName} </p><p>Room
                    : {this.state.data.roomName}</p><p>Time
                    Start: {formatTime(true, this.state.data.startHour) + ":" + formatTime(false, this.state.data.startMinute)}</p>End
                    Time: {formatTime(true, this.state.data.endHour) + ":" + formatTime(false, this.state.data.endMinute)}
                </div>
                <hr/>

            </div>
        );
    }

}

function formatTime(isHour, time) {
    if (isHour) {
        if (time < 10) {
            return "0" + time;
        }
        return time;
    } else {
        if (time < 10) {
            return time + "0";
        }
        return time;
    }
}

export default SessionAdminView