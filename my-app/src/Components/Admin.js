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
            message:"",
            ID:"",
            name:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleID = this.handleID.bind(this);
        this.handleName = this.handleName.bind(this);
    }


    updateCallback = (data) => {
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
        let myJSON = {"sessionId":this.state.ID, "name":this.state.name,"token":localStorage.getItem('myToken')}
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
    handleID = (e) => {
        this.setState({ID:e.target.value});
    }
    handleName = (e) => {
        this.setState({name:e.target.value});
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
        if (data.status === 200) {
            if(data.adminStatus === "1") {
                this.setState({"authenticated": true, "token": data.token})
                localStorage.setItem('myToken', data.token);
                this.setState({message: ""})
            }
            else{
                this.setState({message:"user does not have admin privileges"});
            }
        }
        else{
            this.setState({message:data.message});
        }
    }

    handleLoginClick = () => {
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/login"
        this.setState({message:"Processing..."})
        let myJSON = {"email":this.state.email === "" ? null:this.state.email, "password":this.state.password === ""?null:this.state.password}
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
                    <label>Session Name:</label> <input type="text" value={this.state.name} onChange={this.handleName}/><br/>
                    <label>Session ID:</label> <input type="text" value={this.state.ID} onChange={this.handleID}/><br/>
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