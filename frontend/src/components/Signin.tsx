import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:5173",
  // This must be true.
  handleCodeInApp: true,
};

const Signin = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");

  async function onSignin() {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        alert("sent Email");
        // ...
      })
      .catch((error) => {
        alert("not sent Email");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);

        // ...
      });
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
