import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "../style/register.scss";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswrod, setConfirmPasswrod] = useState("");
  const [passwordErr, setPasswordErr] = useState<string[] | null>(null);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswrodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswrod(e.target.value);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidation: string[] = [];

    if (password !== confirmPasswrod) {
      formValidation.push("Provided passwords don't match!");
    }

    if (password.length < 8 || confirmPasswrod.length < 8) {
      formValidation.push("Password is too short!");
    }

    if (!/[A-Z]/.test(password) || !/[A-Z]/.test(confirmPasswrod)) {
      formValidation.push(
        "Password needs to have at least one uppercase letter!"
      );
    }

    if (
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password) ||
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(confirmPasswrod)
    ) {
      formValidation.push(
        "Password needs to contain at least 1 special character!"
      );
    }

    if (!/[0-9]/.test(password) || !/[0-9]/.test(confirmPasswrod)) {
      formValidation.push("Password needs to contain at least one number!");
    }

    setPasswordErr(formValidation);

    if (passwordErr?.length == 0) {
      register(email, password);
      //   Navigate("/dashboard");
      return <Navigate to={"/"} />;
    }
  };
  return (
    <main>
      <form onSubmit={handleRegister} className="register-form">
        <h4>Please provide required data:</h4>
        <label htmlFor="email">Email adress:</label>
        <input type="email" name="email" placeholder="enter email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" onChange={handlePasswordChange} required />
        <label htmlFor="confirm-password">Repeat password:</label>
        <input
          type="confirm-password"
          onChange={handleConfirmPasswrodChange}
          required
        />
        <div className="password-req">
          <p className="password-req__header">Password must contain:</p>
          <p>
            <span className="req-not-fulfilled"></span>At least 8 characters.
          </p>

          <p>
            <span className="req-not-fulfilled"></span>At least 1 uppercase
            character.
          </p>
          <p>
            <span className="req-not-fulfilled"></span>At least 1 number.
          </p>
          <p>
            <span className="req-not-fulfilled"></span>At least 1 special
            character.
          </p>
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
