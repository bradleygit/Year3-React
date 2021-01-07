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
            token: null,
            message:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleEmail = (e) => {
        this.setState({email:e.target.value})
    }
    handlePassword = (e) => {
        this.setState({password:e.target.value})
    }

    handleLoginClick = () => {
        let myJSON = {"email": this.state.email, "password": this.state.password};
        const url = "http://unn-w17004559.newnumyspace.co.uk/KF6012/part1/api/login"
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(myJSON)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                }
            );
    }

    generateLogin() {
        return (
            <div className="loginForm">
                <label>Email:</label> <input type="text" value={this.state.email} onChange={this.handleEmail}/><br/>
                <label>Password:</label> <input type="password" value={this.state.password} onChange={this.handlePassword}/><br/>
                <button onClick={this.handleLoginClick} disabled={false}>Log in</button>
            </div>)
    };

    checkLoggedIn() {
        return (this.state.token == null ? this.generateLogin() : "");
    }


    render() {
        return this.checkLoggedIn();
    };

}

export default Admin;