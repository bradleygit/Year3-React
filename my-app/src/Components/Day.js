import Session from "./Session";
import React from 'react';


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
export default Day;