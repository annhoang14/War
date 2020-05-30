import React, { Component } from 'react';

import '../styling/Spades.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class Diamonds extends Component {

    render() {
        return (
            <Card className="spadeDesign" variant="outlined">
                <CardContent>
                    <div className="cardImg">
                        <img id="cardImg" src={require('../images/diamond.png')} alt="Diamond" />
                        <h2 id="cardVal">{this.props.num}</h2>
                    </div>
                </CardContent>
            </Card>
        )
    }
}