import React, { Component } from 'react';
import { Typography, Avatar, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'

import Login from "./Login.js";
import Register from "./Register.js";

import "../styling/FormPage.css";

export default class FormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false,
            isLogginIn: false,
        }
    }

    toggleRegisterPage = () => {
        this.setState({
            isRegistering: true,
            isLogginIn: false
        })
    }

    toggleLoginPage = () => {
        this.setState({
            isRegistering: false,
            isLogginIn: true,
        })
    }

    render() {
        return (
            (!this.state.isRegistering && !this.state.isLogginIn)
                ?
                <div className="loginPage">
                    <Avatar className="avatar">
                        <VerifiedUserOutlined />
                    </Avatar>
                    <Typography style={{ fontSize: 30 }}>
                        Hello Guest!
                    </Typography>
                    <Button
                        style={{ marginRight: 5 }}
                        variant="contained"
                        color="secondary"
                        className="registerB"
                        onClick={this.toggleRegisterPage}
                    >Register
        </Button>
                    <Button
                        style={{ marginRight: 5 }}
                        color="primary"
                        type="submit"
                        variant="contained"
                        className="loginB"
                        onClick={this.toggleLoginPage}
                    > Login
                </Button>

                </div >
                :
                (this.state.isLogginIn)
                    ?
                    <div>
                        <Login
                            toggleRegisterPage={this.toggleRegisterPage}
                            toggleLoginState={this.props.toggleLoginState}
                        />
                    </div>
                    :
                    (this.state.isRegistering)
                        ?
                        <div>
                            <Register
                                toggleLoginState={this.props.toggleLoginState}
                                toggleLoginPage={this.toggleLoginPage}
                            />
                        </div>
                        :
                        <div>Hello, world</div>

        )
    }
}