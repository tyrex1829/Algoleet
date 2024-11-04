import { useEffect } from "react";
import "./App.css";
import Signin from "./components/Signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";

const auth = getAuth(app);

function App() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUser({
          loading: false,
          user: {
            email: user.email,
          },
        });
      } else {
        setUser({
          loading: false,
        });
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
