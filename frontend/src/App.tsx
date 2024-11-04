// import { useState } from 'react'
import { useEffect } from "react";
import "./App.css";
import Signin from "./components/Signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";

const auth = getAuth(app);

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`This is the user: ${user}`);
      } else {
        console.log(`There is no logged in user`);
      }
    });
  });

  return (
    <>
      <h1 className="text-3xl mb-8">Leetcode clone - AlgoLeet</h1>
      <Signin />
    </>
  );
}

export default App;
