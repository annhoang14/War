import React, { Component } from 'react';

import '../styling/NotLoggedIn.css';

import { DECK } from "./Cards.js";
import Start from "./Start.js";
import UserPlay from "./UserPlay.js";
import CompPlay from "./CompPlay.js";
import GamePlay from "./GamePlay.js";
import FormPage from './FormPage.js';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import { yellow, purple, red } from '@material-ui/core/colors';

import firebase from "../firebase.js";

//difference from LoggedIn is that it doesn't write to database ...

export default class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDeck: [], //initial deck for user
            compDeck: [], //initial deck for comp
            userPlayDeck: [], //cards being put out
            compPlayDeck: [],
            userGets: false, //indicates whether user gets cards if user has higher valued card
            compGets: false, //indicates whether comp gets cards if comp has higher valued card
            isStarted: false, //indicate whether game has started
            isWar: false, //indicate whether is at war
            isFinished: true, //is the game finished
            winner: "User", //declare winner
            highScore: 0, //save high score
            rounds: 0, //save # of rounds
            database: firebase.getDB(),
            wantsToLogIn: false,
        }
    }

    //format card number because face cards
    cardNumFormat = (card) => {
        if (card.num === 11) {
            return "Jack"
        } else if (card.num === 12) {
            return "Queen"
        } else if (card.num === 13) {
            return "King"
        } else if (card.num === 14) {
            return "Ace"
        } else {
            return card.num
        }
    }

    //sets whether game has started or not
    toggleStartGame = () => {
        this.setState({
            isStarted: !this.state.isStarted,
            isWar: false,
            isFinished: !this.state.isFinished,
            userGets: false,
            compGets: false,
        })
        this.setState(prevState => {
            return ({
                userPlayDeck: [],
                compPlayDeck: []
            })
        })
        this.divideDeck(); //when starts or restarts, divide deck
    }

    //for play again button after one round has finished
    startOverFromFinished = () => {
        this.setState({
            userGets: false,
            compGets: false,
            isStarted: false,
            isWar: false,
            isFinished: true,
            winner: "User",
        })
        this.setState(prevState => {
            return ({
                userDeck: [],
                compDeck: [],
                userPlayDeck: [],
                compPlayDeck: [],
                highScore: prevState.highScore,
                rounds: prevState.rounds,
            })
        })
    }

    //divide deck randomly upon starting
    //shuffle first and then divide
    divideDeck = () => {
        let copyDeck = DECK.slice();
        for (let i = copyDeck.length - 1; i > 0; i--) {
            const randomI = Math.floor(Math.random() * (i + 1)); //choose a random index
            [copyDeck[i], copyDeck[randomI]] = [copyDeck[randomI], copyDeck[i]]; //swap the last element with the element at index randomI
        }
        let firstHalf = copyDeck.slice(0, copyDeck.length / 2)
        let secondHalf = copyDeck.slice(copyDeck.length / 2, copyDeck.length)

        this.setState({
            userDeck: firstHalf,
            compDeck: secondHalf
        })
    }

    //assign where cards go 
    getCards = (userOrComp) => {
        this.setState({ isWar: false, userGets: false, compGets: false });
        for (let i = 0; i < this.state.userPlayDeck.length; i++) {
            let cardUser = this.state.userPlayDeck[i];
            let cardComp = this.state.compPlayDeck[i];
            if (userOrComp === "user") {
                this.setState(prevState => {
                    return (
                        {
                            userDeck: [...prevState.userDeck, cardUser, cardComp]
                        })
                })
            } else {
                this.setState(prevState => {
                    return (
                        {
                            compDeck: [...prevState.compDeck, cardUser, cardComp]
                        })
                })
            }
        }
    }

    noWarPlay = () => {
        //clear play deck
        this.setState(prevState => {
            return ({
                userPlayDeck: [],
                compPlayDeck: []
            })
        })

        //get first cards in each deck
        if (this.state.userDeck.length !== 0 && this.state.compDeck.length !== 0) {
            let userCard = this.state.userDeck[0]
            let compCard = this.state.compDeck[0]

            //delete the first card from both decks
            let newUserDeck = this.state.userDeck.slice(1, this.state.userDeck.length)
            let newCompDeck = this.state.compDeck.slice(1, this.state.compDeck.length)

            this.setState(prevState => {
                return ({
                    userDeck: newUserDeck,
                    compDeck: newCompDeck,
                })
            })

            //build playing Deck 
            this.setState(prevState => {
                return ({
                    userPlayDeck: [...prevState.userPlayDeck, userCard],
                    compPlayDeck: [...prevState.compPlayDeck, compCard]
                })
            })

            //compare Cards
            if (userCard.num > compCard.num) {
                this.setState({ isWar: false, userGets: true, compGets: false })

            } else if (userCard.num < compCard.num) {
                this.setState({ isWar: false, userGets: false, compGets: true })

            } else {
                this.setState({ isWar: true })
            }
        } else { //finish game and set winner
            this.setState({ isFinished: true })
            if (this.state.userDeck.length === 0) {
                this.setState({ winner: "Computer" })
            } else {
                this.setState({ winner: "User" })
                this.setState(prevState => {
                    return ({
                        highScore: prevState.highScore + 1,
                    })
                })
            }
            this.setState(prevState => {
                return ({
                    rounds: prevState.rounds + 1,
                })
            })

        }
    }

    //logic when war is played
    warPlay = () => {
        if (this.state.isWar &&
            this.state.userDeck.length >= 3 && this.state.compDeck.length >= 3 &&
            this.state.userPlayDeck.length !== 0 && this.state.compPlayDeck.length !== 0) {

            //take next card face down
            let userCard1 = this.state.userDeck[0]
            let compCard1 = this.state.compDeck[0]
            //take next card face up
            let userCard2 = this.state.userDeck[1]
            let compCard2 = this.state.compDeck[1]

            //delete the first two cards from both decks
            let newUserDeck = this.state.userDeck.slice(2, this.state.userDeck.length)
            let newCompDeck = this.state.compDeck.slice(2, this.state.compDeck.length)

            this.setState(prevState => {
                return ({
                    userDeck: newUserDeck,
                    compDeck: newCompDeck
                })
            })

            //build up warDecks
            this.setState(prevState => {
                return ({
                    userPlayDeck: [...prevState.userPlayDeck, userCard1, userCard2],
                    compPlayDeck: [...prevState.compPlayDeck, compCard1, compCard2]
                })
            })

            if (userCard2.num > compCard2.num) {
                this.setState({ isWar: false, userGets: true, compGets: false })

            } else if (userCard2.num < compCard2.num) {
                this.setState({ isWar: false, userGets: false, compGets: true })
            }
        } else if (this.state.isWar &&
            (this.state.userDeck.length === 2 || this.state.compDeck.length === 2)) { //if there are only 2 cards left
            //remove only one card remaining from either
            let userCard1 = this.state.userDeck[0]
            let compCard1 = this.state.compDeck[0]

            let newUserDeck = this.state.userDeck.slice(1, this.state.userDeck.length)
            let newCompDeck = this.state.compDeck.slice(1, this.state.compDeck.length)

            this.setState(prevState => {
                return ({
                    userDeck: newUserDeck,
                    compDeck: newCompDeck
                })
            })

            //build up warDecks
            this.setState(prevState => {
                return ({
                    userPlayDeck: [...prevState.userPlayDeck, userCard1],
                    compPlayDeck: [...prevState.compPlayDeck, compCard1]
                })
            })

            if (userCard1.num > compCard1.num) {
                this.setState({ isWar: false, userGets: true, compGets: false })

            } else if (userCard1.num < compCard1.num) {
                this.setState({ isWar: false, userGets: false, compGets: true })
            } else {
                this.setState({ isFinished: true })
                if (this.state.userDeck.length === 0) {
                    this.setState({ winner: "Computer" })
                } else {
                    this.setState({ winner: "User" })
                    this.setState(prevState => {
                        return ({
                            highScore: prevState.highScore + 1,
                        })
                    })
                }
                this.setState(prevState => {
                    return ({
                        rounds: prevState.rounds + 1,
                    })
                })
            }
        } else if (
            this.state.isWar &&
            (this.state.userDeck.length === 1 || this.state.compDeck.length === 1)) {
            //end game if equal and one person has only 1 card left
            this.setState({ isFinished: true })
            if (this.state.userDeck.length === 1) {
                this.setState({ winner: "Computer" })
            } else if (this.state.compDeck.length === 1) {
                this.setState({ winner: "User" })
                this.setState(prevState => {
                    return ({
                        highScore: prevState.highScore + 1,
                    })
                })
            }
            this.setState(prevState => {
                return ({
                    rounds: prevState.rounds + 1,
                })
            })
        }
    }

    toggleWantsToLogIn = () => {
        this.setState({ wantsToLogIn: !this.state.wantsToLogIn })
    }

    render() {
        return (
            <div className="NotLoggedInScreen">
                {(!this.state.wantsToLogIn) ?
                    <div>
                        <div className="LogInB">
                            <Tooltip title="Log in to see your score!">
                                <Button
                                    color="secondary"
                                    onClick={this.toggleWantsToLogIn}
                                > Log In
                            </Button>
                            </Tooltip>
                        </div>
                        <div className="header">
                            <h1 className="Name">AT WAR</h1>
                        </div>

                        <div className="subheader">
                            <h4><em>The stakes are higher than ever before!</em></h4>
                            <h4><em>It will make you question who your friends and enemies are</em></h4>
                        </div>

                        <div>
                            {this.state.isStarted ?
                                this.state.isFinished ?
                                    <div>
                                        {(this.state.winner === "User") ?
                                            <div className="userWinnerMessage" style={{ color: yellow[400] }}>
                                                <h1>You're the Winner! Congratulations!</h1>
                                                <h3>User's High Score: {`${this.state.highScore} out of ${this.state.rounds} rounds`}</h3>
                                                <img id="fireworks" src={require('../images/fireworks.gif')} alt="Fireworks" />
                                            </div>
                                            :
                                            <div className="compWinnerMessage" style={{ color: red[700] }}>
                                                <h1>Computer Won!</h1>
                                                <h2>Too bad...Good luck next time!</h2>
                                                <h3>User's High Score: {`${this.state.highScore} out of ${this.state.rounds} rounds`}</h3>
                                                <img id="sad" src={require('../images/sad.gif')} alt="Fireworks" />
                                            </div>
                                        }
                                        <div className="playAgain">
                                            <Button
                                                variant="contained"
                                                onClick={() => this.startOverFromFinished()}
                                            >
                                                PLAY AGAIN
                                        </Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="gameBody">
                                        <div className="UserPlay">
                                            <UserPlay
                                                userPlayDeck={this.state.userPlayDeck}
                                                userDeck={this.state.userDeck}
                                            />
                                        </div>

                                        <div className="GamePlay">
                                            <h2 style={{ color: purple[500], fontSize: 45 }}>Round <br /> {this.state.rounds + 1}</h2>
                                            <GamePlay
                                                toggleStartGame={this.toggleStartGame}
                                                isWar={this.state.isWar}
                                                warPlay={this.warPlay}
                                                noWarPlay={this.noWarPlay}
                                                userGets={this.state.userGets}
                                                compGets={this.state.compGets}
                                                getCards={this.getCards}
                                            />
                                        </div>
                                        <div className="CompPlay">
                                            <CompPlay
                                                compPlayDeck={this.state.compPlayDeck}
                                                compDeck={this.state.compDeck}
                                            />
                                        </div>
                                    </div>
                                :
                                <div>
                                    <Start
                                        toggleStartGame={this.toggleStartGame}
                                        divideDeck={this.divideDeck}
                                    />
                                    <p><strong>Last High Score:</strong> {`${this.state.highScore} out of ${this.state.rounds} rounds`}</p>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <Dialog className="formPageDialog"
                        open={this.state.wantsToLogIn}
                        onClose={this.toggleWantsToLogIn}
                    >
                        <FormPage
                            toggleLoginState={this.props.toggleLoginState}
                        />
                    </Dialog>
                }
            </div >
        );
    }
}
