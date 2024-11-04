import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { app } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../App.tsx";

const actionCodeSettings = {
  url: "http://localhost:5173",
  handleCodeInApp: true,
};

const Signin = () => {
  const [email, setEmail] = useState("");

  async function onGoogleSignin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token for accessing the Google API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        return;
      }
      const token = credential.accessToken;
      const user = result.user;

      console.log("User signed in with Google:", user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Google sign-in failed. Please try again.");

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  async function onSignin() {
    if (!email) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Verification email sent!");
    } catch (error) {
      console.error("Error sending email link:", error);
      alert("Failed to send email. Please try again.");
    }
  }

  return (
    <div>
      <input
        className=" mr-4"
        type="text"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          onSignin();
        }}
      >
        Signup
      </button>
      <br />
      <button
        onClick={() => {
          onGoogleSignin();
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Signin;
