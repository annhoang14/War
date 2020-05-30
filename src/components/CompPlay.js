import React, { Component } from 'react';
import Spades from "./Spades.js";
import Hearts from "./Hearts.js";
import Diamonds from "./Diamonds.js";
import Clubs from "./Clubs.js";
import FaceDown from "./FaceDown.js";

import "../styling/UserPlay.css"; //same styling as UserPlay

export default class ComPlay extends Component {
    //computer's side of the game
    render() {
        return (
            <div>
                <h2>Computer's Cards</h2>
                {(this.props.compPlayDeck.length !== 0) ?
                    (this.props.compPlayDeck.length === 1) ?
                        <div>
                            {this.props.compPlayDeck.map((card, index) => {
                                if (index % 2 === 1) {
                                    return (
                                        <FaceDown key={card.num} />
                                    )
                                } else {
                                    if (card.suit === "Spades") {
                                        return (
                                            <Spades key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Hearts") {
                                        return (
                                            <Hearts key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Diamonds") {
                                        return (
                                            <Diamonds key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Clubs") {
                                        return (
                                            <Clubs key={card.num} num={card.num} />
                                        )
                                    } else {
                                        return <div></div>
                                    }
                                }
                            })}
                        </div>
                        :
                        <div className="threeCards">
                            {this.props.compPlayDeck.map((card, index) => {
                                if (index % 2 === 1) {
                                    return (
                                        <FaceDown key={card.num} />
                                    )
                                } else {
                                    if (card.suit === "Spades") {
                                        return (
                                            <Spades key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Hearts") {
                                        return (
                                            <Hearts key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Diamonds") {
                                        return (
                                            <Diamonds key={card.num} num={card.num} />
                                        )
                                    } else if (card.suit === "Clubs") {
                                        return (
                                            <Clubs key={card.num} num={card.num} />
                                        )
                                    } else {
                                        return <div></div>
                                    }
                                }
                            })}
                        </div>
                    :
                    "Let's play!"
                }
                <p><strong>Cards remaining:</strong> {this.props.compDeck.length}</p>
            </div>
        )
    }
}