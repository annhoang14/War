import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { pink } from '@material-ui/core/colors';

import firebase from "../firebase.js"

const delay = ms => new Promise(res => setTimeout(res, ms));
export default class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        this.readEveryUser()
    }

    //https://stackoverflow.com/questions/45001916/how-to-get-and-display-all-child-list-from-firebase-react
    readEveryUser = async () => {
        await delay(1000)
        const rootRef = this.props.database.ref().orderByChild('highScore') //least to greatest
        rootRef.once('value', snap => {
            snap.forEach(user => {
                this.setState(prevState => {
                    return ({
                        users: [...prevState.users, [user.key, user.val()]]
                    })
                })
            })
        })
        await delay(1000)
        this.sortScoresHL()
    }

    sortScoresHL = () => {
        let highToLow = this.state.users.slice();
        highToLow.reverse()
        this.setState(prevState => {
            return ({ users: highToLow })
        })
    }

    render() {
        return (
            <div>
                {this.state.users.map((user, index) => {
                    let you = ""
                    if (user[0] === firebase.getEmail()) {
                        you = <strong>YOU</strong>
                    } else {
                        you = user[0]
                    }
                    return (
                        <div key={index}>
                            {(index === 0) ?
                                <div>
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar src={require('../images/goldmedal.jpg')} style={{ backgroundColor: pink[500] }}>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={you} secondary={`High Score: ${user[1].highScore}`} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                                :
                                (index === 1) ?
                                    <div>
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={require('../images/silvermedal.jpg')} style={{ backgroundColor: pink[500] }}>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={you} secondary={`High Score: ${user[1].highScore}`} />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                    :
                                    (index === 2) ?
                                        <div>
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar src={require('../images/bronzemedal.jpg')} style={{ backgroundColor: pink[500] }}>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={you} secondary={`High Score: ${user[1].highScore}`} />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                        :
                                        <div>
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar style={{ backgroundColor: pink[500] }}>
                                                        {index + 1}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={you} secondary={`High Score: ${user[1].highScore}`} />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

}