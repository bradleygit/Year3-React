import React from 'react';

class Author extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let text = "";
        if(this.props.data.sessionName !== null){
            text = <p>Session Name : {this.props.data.sessionName} <br/>Day: {this.props.data.day}<br/>Time Start: {formatTime(true,this.props.data.startHour)}:{formatTime(false,this.props.data.startMinute)}<br/>
            Time End: {formatTime(true,this.props.data.endHour)}:{formatTime(false,this.props.data.endMinute)}<br/>Room: {this.props.data.roomName}</p>
        }
        return (
            <div className="author">
                <p> {this.props.data.authorName}</p>
                {text !== "" ? <p>{text}</p> : ""}
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <div>
                <p>Search: {this.props.query}</p>
                <input
                    type='text'
                    placeholder='search'
                    value={this.props.query}
                    onChange={this.props.handleSearch}
                />
            </div>
        )
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

class Authors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page:1,
            pageSize:10,
            query:"",
            data:[],
            schedule:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.fetchAuthors();
    }

    fetchAuthors = () => {
        fetch("http://localhost/KF6012/part1/api/authors?getsessions=true")
        .then((response) => response.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                }
            );
    }





    handlePreviousClick = () => {
        this.setState({page:this.state.page-1})
    }

    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }

    handleSearch = (e) => {
        this.setState({page:1,query:e.target.value})
    }

    searchString = (s) => {
        return s.toLowerCase().includes(this.state.query.toLowerCase())
    }

    searchName = (details) => {
        return (this.searchString(details.authorName));
    }

    handleSelect = (e) => {
        this.setState({page:1,rating:e.target.value})
    }


    render() {
        let filteredData =  (
            this.state.data.filter(this.searchName)
        )
        let noOfPages = Math.ceil(filteredData.length/this.state.pageSize)
        if (noOfPages === 0) {noOfPages=1}
        let disabledPrevious = (this.state.page <= 1)
        let disabledNext = (this.state.page >= noOfPages)

        return (
            <div className="daysContainer">
                <Search query={this.state.query} handleSearch={this.handleSearch}/>
                {
                    filteredData.slice(((this.state.pageSize*this.state.page)-this.state.pageSize),(this.state.pageSize*this.state.page))
                        .map( (data, i) => (<Author key={i} data={data} />) )
                }
                <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
                Page {this.state.page} of {noOfPages}
                <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
            </div>
        );
    }
}

export default Authors;