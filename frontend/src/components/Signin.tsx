import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { app } from "../utils/firebase";

const actionCodeSettings = {
  url: "http://localhost:5173",
  handleCodeInApp: true,
};

const Signin = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");

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
      <button
        onClick={() => {
          onSignin();
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signin;
