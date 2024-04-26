import { FormEvent, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import "../style/login.scss";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
        // Redirect to user dashboard
        navigate("/dashboard");
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        console.log("Error code:", errorCode);
      });
  };

  return (
    <>
      <main>
        <form onSubmit={handleLogin} className="login-form">
          <h4>Log in:</h4>
          <label htmlFor="email">Email adress:</label>
          <input type="email" name="email" placeholder="enter your email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
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
