// import { useState } from 'react'
import "./App.css";
import Signin from "./components/Signin";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Signin />
      <h1>Leetcode clone - AlgoLeet</h1>
    </>
  );
}

export default App;
