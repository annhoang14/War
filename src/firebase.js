import app from 'firebase/app';
import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

//https://www.youtube.com/watch?v=K_wZCW6wXIo

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
        this.database = firebase.database()
    }
    login = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout = () => {
        return this.auth.signOut()
    }

    register = async (name, email, password) => {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    isInitialized = () => {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername = () => {
        return this.auth.currentUser.displayName
    }

    getEmail = () => {
        let userEmail = this.auth.currentUser.email;
        let indexofAt = userEmail.indexOf("@")
        let username = userEmail.substring(0, indexofAt)
        return username;
    }

    getDB = () => {
        return this.database;
    }
}

export default new Firebase()
//firebase.initializeApp(firebaseConfig);

