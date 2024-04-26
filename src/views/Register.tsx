import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "../style/register.scss";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

function Register() {
  const { setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercaseChar: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // Collect inputs
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Final form validation
    let passwordValid = false;
    let passwordMatch = false;

    if (
      passwordValidation.length &&
      passwordValidation.number &&
      passwordValidation.specialChar &&
      passwordValidation.uppercaseChar
    ) {
      passwordValid = true;
    }

    if (password === confirmPassword) {
      passwordMatch = true;
    }
    console.log("PASSWORD MATCH", passwordMatch);
    // REGISTER IF ALL CONDITIONS ARE MET
    if (passwordValid && passwordMatch) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // extract the user
          const user = userCredential.user;
          console.log(user);
          setUser(user);
          navigate("/dashboard");
        })
        .catch((error: FirebaseError) => {
          console.log(error.code);
        });
    }
  };

  useEffect(() => {
    // Handle validation of the password
    const validatePass = {
      length: false,
      uppercaseChar: false,
      number: false,
      specialChar: false,
    };

    if (password.length >= 8) {
      validatePass.length = true;
    }
    if (/[A-Z]/.test(password)) {
      validatePass.uppercaseChar = true;
    }

    if (/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password)) {
      validatePass.specialChar = true;
    }

    if (/[0-9]/.test(password)) {
      validatePass.number = true;
    }
    setPasswordValidation(validatePass);
  }, [password]);

  return (
    <main>
      <form onSubmit={handleRegister} className="register-form">
        <h4>Please provide required data:</h4>
        <label htmlFor="email">Email adress:</label>
        <input type="email" name="email" placeholder="enter email" required />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <label htmlFor="confirm-password">Repeat password:</label>
        <input type="password" name="confirm-password" required />
        <div className="password-req">
          <p className="password-req__header">Password must contain:</p>
          <p>
            <span
              className={
                passwordValidation.length
                  ? "req-fulfilled"
                  : "req-not-fulfilled"
              }
            ></span>
            At least 8 characters.
          </p>

          <p>
            <span
              className={
                passwordValidation.uppercaseChar
                  ? "req-fulfilled"
                  : "req-not-fulfilled"
              }
            ></span>
            At least 1 uppercase character.
          </p>
          <p>
            <span
              className={
                passwordValidation.number
                  ? "req-fulfilled"
                  : "req-not-fulfilled"
              }
            ></span>
            At least 1 number.
          </p>
          <p>
            <span
              className={
                passwordValidation.specialChar
                  ? "req-fulfilled"
                  : "req-not-fulfilled"
              }
            ></span>
            At least 1 special character.
          </p>
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
