import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import "../style/login.scss";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const [loginErrClass, setLoginErrClass] = useState(
    "login-err-paragraph--hidden"
  );
  const [emailVer, setEmailVer] = useState(true);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
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
        // Check if user verified his email
        if (user.emailVerified) {
          setUser(user);
          setEmailVer(true);
          // Set display to error class
          setLoginErrClass("login-err-paragraph--hidden");
          // Redirect to user dashboard
          navigate("/dashboard");
          // If he didn't show error and signout
        } else {
          setEmailVer(false);
          // Set display to error class
          setLoginErrClass("login-err-paragraph--hidden");
          signOut(auth)
            .then(() => {
              setUser(null);
            })
            .catch((error: FirebaseError) => {
              console.log(error.code);
            });
        }
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
            id="email"
            placeholder="enter your email"
            autoComplete="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <p className={loginErrClass}>{loginErr}</p>
          <button type="submit">Login</button>
          {/* ERROR if something goes wrong */}
          {!emailVer ? (
            <p className="login-status">
              Please verify your email first with the link you received!
            </p>
          ) : (
            ""
          )}
          {/* PASSWORD RESET */}
          <p>
            Forgot your password? Reset <Link to={"../reset"}>here!</Link>
          </p>
        </form>
        <form></form>
      </main>
    </>
  );
}

export default LogIn;
