// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjMSsqHg7kNlcLbDAhwOjQqN11q0o3AeQ",
  authDomain: "spotr-258a2.firebaseapp.com",
  databaseURL: "https://spotr-258a2-default-rtdb.firebaseio.com",
  projectId: "spotr-258a2",
  storageBucket: "spotr-258a2.appspot.com",
  messagingSenderId: "940149876291",
  appId: "1:940149876291:web:43b8fdf03acb27464296f6",
  measurementId: "G-MTW78WL73N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;