import { useEffect } from "react";
import "./App.css";
import Signin from "./components/Signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { RecoilRoot, useRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";

export const auth = getAuth(app);

function App() {
  return (
    <RecoilRoot>
      <StoreApp />
    </RecoilRoot>
  );
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);

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
  }, []);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (!user.user) {
    return (
      <div>
        <Signin />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl mb-8">Leetcode clone - AlgoLeet</h1>
      You are logged in as {user.user?.email}
    </>
  );
}

export default App;
