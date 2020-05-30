import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase.js"
import LoggedIn from './components/LoggedIn.js';
import NotLoggedIn from './components/NotLoggedIn.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      firebaseInitialized: false
    }
  }

  componentDidMount() {
    let val = firebase.isInitialized();
    this.setState({ firebaseInitialized: val })
  }


  toggleLoginState = (isSuccessful) => {
    this.setState({
      isLoggedIn: isSuccessful
    })
  }

  render() {
    return (
      this.state.isLoggedIn
        ?
        <LoggedIn
          toggleLoginState={this.toggleLoginState}
          isLoggedIn={this.state.isLoggedIn}
        />
        :
        <NotLoggedIn
          toggleLoginState={this.toggleLoginState}
        />
    )
  }
}
