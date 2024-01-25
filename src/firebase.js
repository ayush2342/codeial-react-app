
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQnOVeHR03Mia4So2zzqVx5CkWzjavd8U",
    authDomain: "codeial-react-app-a2637.firebaseapp.com",
    projectId: "codeial-react-app-a2637",
    storageBucket: "codeial-react-app-a2637.appspot.com",
    messagingSenderId: "1028526070351",
    appId: "1:1028526070351:web:2bd4b37b9be370cd94683a"
  };


const app = firebase.initializeApp(firebaseConfig);
export default app;