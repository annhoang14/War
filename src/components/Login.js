import React, { Component } from 'react';

import { Typography, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from '../firebase'

import "../styling/Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    handleLogin = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginUser = async () => {
        try {
            await firebase.login(this.state.email, this.state.password)
            this.props.toggleLoginState(true) //TO PASS DOWN from FormPage!
        } catch (error) {
            alert(error.message)
            this.props.toggleLoginState(false) //TO PASS DOWN!
        }
    }

    render() {
        return (
            <div className="loginForm">
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{ fontSize: 30 }}>
                    SIGN IN
                </Typography>
                <form onSubmit={e => e.preventDefault()}>
                    <FormControl required>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            value={this.state.email}
                            onChange={e => this.handleLogin(e)} />
                    </FormControl>
                    <br />
                    <FormControl required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={e => this.handleLogin(e)}
                        />
                    </FormControl>
                    <br />
                    <Button
                        style={{ marginTop: 15, marginRight: 5 }}
                        variant="contained"
                        color="secondary"
                        onClick={this.props.toggleRegisterPage} //TO PASSDOWN!!!!1
                    >Register
                    </Button>
                    <Button
                        style={{ marginTop: 15 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={this.loginUser}
                    > Sign In
                    </Button>
                </form>
            </div>
        )
    }
}