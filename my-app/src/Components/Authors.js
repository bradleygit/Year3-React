import React from 'react';
import AuthorData from './AuthorData.js'

class Author extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            additionalData:[],
            displayData :false
        }
    }
    componentDidMount() {
        this.fetchAuthorDataWithID(this.state.data.authorId);
    }

    handleClick = () => {
            this.setState({displayData: !this.state.displayData})
    }

    fetchAuthorDataWithID = (authorId) => {

        fetch("http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/content?author="+authorId)
            .then((response) => response.json())
            .then((data) => {
                this.setState({additionalData: data.data})
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                }
            );
    }

    render() {
        let text = "";
        if(this.state.displayData){
            text = this.state.additionalData.map((data, i) => (<AuthorData key={i} data={data}/>))
            }
        return (
            <div className="author">
                <div onClick={this.handleClick}><p> Author Name: {this.props.data.authorName}</p><p> Author Institution: {this.props.data.authorInst}</p></div>
                {text}
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

class Authors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page:1,
            pageSize:10,
            query:"",
            data:[],
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.fetchAuthors();
    }

    fetchAuthors = () => {
        fetch("http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/authors/")
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
        let noOfPages = Math.ceil(filteredData.length/this.state.pageSize);
        if (noOfPages === 0) {noOfPages=1};
        let disabledPrevious = (this.state.page <= 1);
        let disabledNext = (this.state.page >= noOfPages);
        let loading = this.state.data.length === 0 ? <div className = "message">Loading Data...</div>:null; //this is here if network speed is low -> seems like it hasnt worked then all the data appears
        return (
            <div className="daysContainer">
                <Search query={this.state.query} handleSearch={this.handleSearch}/>
                {loading}
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