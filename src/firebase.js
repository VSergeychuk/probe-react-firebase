import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC0FZw0mkvurb3ynYuESX6KjN1Hs_8o0no",
    authDomain: "probe-react-firebase.firebaseapp.com",
    databaseURL: "https://probe-react-firebase.firebaseio.com",
    projectId: "probe-react-firebase",
    storageBucket: "probe-react-firebase.appspot.com",
    messagingSenderId: "277130507675"
};
firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
