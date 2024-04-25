import { FormEvent, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import "../style/login.scss";

function LogIn() {
  const { loginEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginEmail(email, password);
    navigate("/dashboard");
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
