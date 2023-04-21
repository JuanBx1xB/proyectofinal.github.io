import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZW3wsveWeZWtolWvUrL3rWbJuQ3PvYrI",
  authDomain: "crud-juan-react.firebaseapp.com",
  projectId: "crud-juan-react",
  storageBucket: "crud-juan-react.appspot.com",
  messagingSenderId: "251680232972",
  appId: "1:251680232972:web:ee91419a7ff3806f3a0029"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)