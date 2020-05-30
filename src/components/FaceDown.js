import React, { Component } from 'react';

import '../styling/Spades.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class FaceDown extends Component {
    //style FaceDown cards
    render() {
        return (
            <Card className="spadeDesign" variant="outlined">
                <CardContent>
                    <div className="cardImg">
                        <img id="cardImg" src={require('../images/facedown.png')} alt="FaceDown" />
                    </div>
                </CardContent>
            </Card>
        )
    }
}