import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ReplayIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';
import { green, pink } from '@material-ui/core/colors';

import "../styling/GamePlay.css";

export default class GamePlay extends Component {
    //the middle section
    render() {
        return (
            <div>
                <div className="playB">
                    {this.props.isWar ?
                        <div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => this.props.warPlay()}
                                >
                                    IT'S WAR
                            </Button>
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                {!this.props.userGets && !this.props.compGets
                                    ?
                                    <Button
                                        className="playB"
                                        variant="contained"
                                        onClick={() => this.props.noWarPlay()}
                                        disabled={this.props.userGets || this.props.compGets}
                                        style={{ backgroundColor: green[500], color: pink[50] }}
                                    >
                                        PLAY
                                    </Button>
                                    :
                                    <div>
                                        {
                                            this.props.userGets ?
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="arrowBack"
                                                    size="medium"
                                                    onClick={() => this.props.getCards("user")}
                                                ><ArrowBackIcon />
                                                </Button>
                                                :
                                                this.props.compGets ?
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="arrowFwd"
                                                        size="medium"
                                                        onClick={() => this.props.getCards("comp")}
                                                    ><ArrowForwardIcon />
                                                    </Button>
                                                    :
                                                    <div></div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className="restartB">
                    <Tooltip title="Restart game">
                        <Button
                            variant="contained"
                            onClick={() => this.props.toggleStartGame()}
                        >
                            <ReplayIcon /> RESTART
                        </Button>
                    </Tooltip>
                </div>
            </div >
        )
    }
}