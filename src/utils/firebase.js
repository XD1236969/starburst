import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // 新增這行

const firebaseConfig = {
  apiKey: "AIzaSyA8gzGWjM_xzSq55MI41iNhltPpX2BHeoo",
  authDomain: "starburst-c8763.firebaseapp.com",
  projectId: "starburst-c8763",
  storageBucket: "starburst-c8763.appspot.com",
  messagingSenderId: "980462179298",
  appId: "1:980462179298:web:7f4304a5a90a9e83065fbb",
  measurementId: "G-V3SQW3M789"
};

firebase.initializeApp(firebaseConfig)

export default firebase;