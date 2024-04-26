import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import "../style/login.scss";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const [loginErrClass, setLoginErrClass] = useState(
    "login-err-paragraph--hidden"
  );

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create form data and collect its inputs
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Get firebase auth object
    const auth = getAuth();
    // Login to the application
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get user object
        const user = userCredential.user;
        setUser(user);
        // Set display to error class
        setLoginErrClass("login-err-paragraph--hidden");
        // Redirect to user dashboard
        navigate("/dashboard");
      })
      .catch((error: FirebaseError) => {
        setLoginErr(error.code);
        setLoginErrClass("login-err-paragraph--active");
      });
  };

  return (
    <>
      <main>
        <form onSubmit={handleLogin} className="login-form">
          <h4>Provide login credentials:</h4>
          <label htmlFor="email">Email adress:</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
          <p className={loginErrClass}>{loginErr}</p>
          <p>
            No account yet? Please <Link to={"../register"}>Register.</Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
}

export default LogIn;
