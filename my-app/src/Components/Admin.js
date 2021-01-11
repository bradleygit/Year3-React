import React from 'react';
import SessionAdminView from './SessionAdminView.js'

/**
 * Manages the admin page
 *
 * @author Bradley Slater
 */

class Admin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authenticated: false,
            message: "",
            ID: "",
            name: "",
            data: [],
            showDetails: false,
            admin: false
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleID = this.handleID.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    componentDidMount() {
        this.fetchPresentationAuthors()

    }

    updateCallback = (data) => {
        if (data.status !== 200) {
            this.setState({"authenticated": false});
            localStorage.removeItem('myToken');
            this.fetchPresentationAuthors(); //re-fetch data
        }
    }
    handleLogoutClick = () => {
        this.setState({"authenticated": false})
        this.setState({email: ""});
        this.setState({password: ""});
    }
    handleDetailsClick = () => {
        this.setState({showDetails: !this.state.showDetails})
    }

    handleUpdateClick = () => {
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/update"
        let myJSON = {"sessionId": this.state.ID, "name": this.state.name, "token": localStorage.getItem('myToken')}
        this.postData(url, myJSON, this.updateCallback);
        this.setState({data: []})
    }


    fetchPresentationAuthors = () => {
        fetch("http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/sessions")
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

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value});
    }
    handlePassword = (e) => {
        this.setState({password: e.target.value});
    }
    handleID = (e) => {
        this.setState({ID: e.target.value});
    }
    handleName = (e) => {
        this.setState({name: e.target.value});
    }
    postData = (url, myJSON, callback) => {
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(myJSON)
        })
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            })
            .catch((err) => {
                    console.log("something went wrong ", err);
                }
            );
    }

    loginCallback = (data) => {
        if (data.status === 200) {
            localStorage.setItem('myToken', data.token);
            this.setState({message: ""})
            if (data.adminStatus === "1") {
                this.setState({"authenticated": true, "token": data.token, "admin": true})
            } else {
                this.setState({"authenticated": true, "token": data.token, "admin": false})
            }
        } else {
            this.setState({message: data.message});
        }
    }

    handleLoginClick = () => {
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/login"
        this.setState({message: "Processing..."})
        let myJSON = {
            "email": this.state.email === "" ? null : this.state.email,
            "password": this.state.password === "" ? null : this.state.password
        }
        this.postData(url, myJSON, this.loginCallback)
    }

    generateLogin() {
        return (
            <div className="loginForm">
                <label>Email:</label> <input type="text" value={this.state.email} onChange={this.handleEmail}/><br/>
                <label>Password:</label> <input type="password" value={this.state.password} onChange={this.handlePassword}/><br/>
                <button onClick={this.handleLoginClick} disabled={false}>Log in</button>
                <p className="message">{this.state.message}</p>
            </div>)
    };


    getAdminOnly() {
        return (<div>
                <label>Session Name:</label> <input type="text" value={this.state.name} onChange={this.handleName}/><br/>
                <label>Session ID:</label> <input type="text" value={this.state.ID} onChange={this.handleID}/><br/>
                <button onClick={this.handleUpdateClick}>Update</button>
            </div>
        );
    }

    generateAdmin() {
        if (this.state.authenticated) {
            return (
                <div className="loginForm">
                    {this.state.admin ? this.getAdminOnly() : ""}
                    <button onClick={this.handleLogoutClick}>Log out</button>
                    <button onClick={this.handleDetailsClick}>Toggle Details</button>
                    <div className="adminDetails">
                        {this.state.data.map((data, i) => (this.state.showDetails ?
                                <SessionAdminView key={i} data={data}/> :
                                <p>Session Name: {data.sessionName} </p>
                        ))}
                    </div>
                </div>
            );
        }

    }


    checkLoggedIn() {
        return (this.state.authenticated === false ? this.generateLogin() : this.generateAdmin());
    }


    render() {
        return this.checkLoggedIn();
    };

}


export default Admin;