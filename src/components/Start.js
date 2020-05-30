import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "../styling/Start.css"

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    startGame = (event) => {
        event.preventDefault();
        this.props.toggleStartGame();
        this.props.divideDeck();
    }

    render() {
        return (
            <Button
                size="large"
                variant="contained"
                id="startButton"
                onClick={(event) => this.startGame(event)}
            >
                START
            </Button>
        )
    }
}