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
            data: this.props.data,
        }
    }

    componentDidMount() {
    }


    fetchPresentationAuthors = (url, element) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let a = this.state.authors;
                a.set(element.contentId, data.data);
                this.setState({authors: a})
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                    return [];
                }
            );
    }




    render() {
        let authorData = this.state.data.Authors;
        return (
            <div className="Session">
                <p>Session Name: {this.state.data.sessionName} </p>
                <div className="SessionDetails"><p>Author Chair: {this.state.data.authorName} </p><p>Room
                    : {this.state.data.roomName}</p><p>Time
                    Start: {formatTime(true, this.state.data.startHour) + ":" + formatTime(false, this.state.data.startMinute)}</p>End
                    Time: {formatTime(true, this.state.data.endHour) + ":" + formatTime(false, this.state.data.endMinute)}
                </div>


                {


                    this.state.data.Authors.length !== 0 ? authorData.map((data,i)=>(<Presentation key={i} data={data}/>)) : ""}
                <hr/>

            </div>
        );
    }

}


class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }


    render() {
        let authors = this.state.data;


        return (
            <div className="Presentation">
                <p>Authors : {authors.authors}</p><p>Title: {authors.title}</p><p>Abstract : {authors.abstract}</p>
                <p>Awards: {authors.award !== "" ?authors.award : "None"}<p>Institution: {authors.authorInst}</p></p><p>Type: {authors.type}</p>
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

export default Session;