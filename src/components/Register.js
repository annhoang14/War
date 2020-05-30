import React, { Component } from 'react';

import { Typography, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from '../firebase'

import "../styling/Register.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        }
    }

    handleRegister = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    registerUser = async () => {
        try {
            await firebase.register(this.state.name, this.state.email, this.state.password)
            this.props.toggleLoginState(true)
        } catch (error) {
            this.props.toggleLoginState(false)
            alert(error.message)
        }
    }

    render() {
        return (
            <div className="registerForm">
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{ fontSize: 30 }}>
                    REGISTER
                </Typography>
                <form onSubmit={e => e.preventDefault()}>
                    <FormControl required>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            id="name"
                            name="name"
                            autoComplete="off"
                            autoFocus
                            value={this.state.name}
                            onChange={e => this.handleRegister(e)} />
                    </FormControl>
                    <br />
                    <FormControl required>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            value={this.state.email}
                            onChange={e => this.handleRegister(e)} />
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
                            onChange={e => this.handleRegister(e)}
                        />
                    </FormControl>
                    <br />
                    <Button
                        style={{ marginTop: 15 }}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={this.registerUser}
                    > Register
                    </Button>
                    <br />
                    <Button
                        style={{ marginTop: 5 }}
                        variant="contained"
                        color="primary"
                        onClick={this.props.toggleLoginPage}
                    >Back to Login
                    </Button>
                </form>
            </div>
        )
    }
}