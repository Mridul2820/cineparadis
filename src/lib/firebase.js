import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: 'moviebuff-36759.firebaseapp.com',
  projectId: 'moviebuff-36759',
  storageBucket: 'moviebuff-36759.appspot.com',
  messagingSenderId: '711559098142',
  appId: '1:711559098142:web:d2d409452039a9bf4ae30f',
  measurementId: 'G-PT0CTB49EM',
};

const firebase = Firebase.initializeApp(config);
const provider = new Firebase.auth.GoogleAuthProvider();
const { FieldValue } = Firebase.firestore;

export { firebase, provider, FieldValue };
