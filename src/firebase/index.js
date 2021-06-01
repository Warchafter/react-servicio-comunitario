// Copy and paste this into your JavaScript code to initialize the Firebase SDK.
// You will also need to load the Firebase SDK.
// See https://firebase.google.com/docs/web/setup for more details.

import firebase from 'firebase';
import 'firebase/auth';
import "firebase/storage";

export const baseApp = firebase.initializeApp({
    "projectId": "condominio-santa-rita",
    "appId": "1:229131348214:web:6b52e65a0b7814a3ea64d7",
    "databaseURL": "https://condominio-santa-rita-default-rtdb.firebaseio.com",
    "storageBucket": "condominio-santa-rita.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyCafYKuE-piSNlfpmmfw0tpXIc5ENbjEWw",
    "authDomain": "condominio-santa-rita.firebaseapp.com",
    "messagingSenderId": "229131348214",
    "measurementId": "G-S3JGWN48R7"
});

const storage = firebase.storage();

export { storage, firebase as default };