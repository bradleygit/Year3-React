import React from 'react';


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
            message:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }


    updateCallback = (data) => {
        console.log(data)
        if (data.status !== 200) {
            this.setState({"authenticated":false});
            localStorage.removeItem('myToken');
        }
    }
    handleLogoutClick = () => {
        this.setState({"authenticated":false})
        this.setState({email:""});
        this.setState({password:""});
    }


    handleUpdateClick = () => {
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/update"
        let myJSON = {"sessionId":"2375", "name":"test","token":localStorage.getItem('myToken')}
        this.postData(url, myJSON, this.updateCallback);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleEmail = (e) => {
        this.setState({email:e.target.value});
    }
    handlePassword = (e) => {
        this.setState({password:e.target.value});
    }

    postData = (url, myJSON, callback) => {
        fetch(url, {   method: 'POST',
            headers : new Headers(),
            body:JSON.stringify(myJSON)})
            .then( (response) => response.json())
            .then( (data) => {
                callback(data);
            })
            .catch ((err) => {
                    console.log("something went wrong ", err);
                }
            );
    }

    loginCallback = (data) => {
        console.log(data)
        if (data.status === 200) {
            this.setState({"authenticated":true, "token":data.token})
            localStorage.setItem('myToken', data.token);
            this.setState({message:""})
        }
        else{
            this.setState({message:data.message});
        }
    }

    handleLoginClick = () => {
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/login"
        let myJSON = {"email":this.state.email, "password":this.state.password}
        console.log(this.state.email + " "+ this.state.password);
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


    generateAdmin(){
        if (this.state.authenticated) {
            return (
                <div className="loginForm">

                    <button onClick={this.handleUpdateClick}>Update</button>
                    <button onClick={this.handleLogoutClick}>Log out</button>

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