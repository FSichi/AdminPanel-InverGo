import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfunkXILcyqEtANKkRf4ROZQs3aWQddUM",
  authDomain: "invergo---mongo.firebaseapp.com",
  projectId: "invergo---mongo",
  storageBucket: "invergo---mongo.appspot.com",
  messagingSenderId: "265659726383",
  appId: "1:265659726383:web:7132605d5fdf55db6ea4da"
};

firebase.initializeApp(firebaseConfig);

export {
  firebase
}