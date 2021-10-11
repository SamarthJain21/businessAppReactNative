// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaBBThNreUeKfCBYgCg306xkMUq-DIVrg",
  authDomain: "mybusiness-4fa76.firebaseapp.com",
  projectId: "mybusiness-4fa76",
  storageBucket: "mybusiness-4fa76.appspot.com",
  messagingSenderId: "222658163473",
  appId: "1:222658163473:web:d2b7d2ac68dc68b7c012b0",
  measurementId: "G-WZSD99NTZT",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const firestore = firebase.firestore(app);
const auth = firebase.auth();
export { auth };
export { firestore };
