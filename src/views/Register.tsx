import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import "../style/register.scss";

function Register() {
  const { setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercaseChar: false,
    number: false,
    specialChar: false,
  });
  // FORM VALIDATION ERROR AND CLASSES
  const [regErrMsg, setRegErrMsg] = useState("");
  const [regPswValidClass, setRegPswValidClass] = useState("reg-err-msg");
  const [regPswMatchClass, setRegPswMatchClass] = useState("reg-err-msg");
  const [regErrClass, setRegErrClass] = useState("reg-err-msg");

  const navigate = useNavigate();

  // PASSWORD CHANGE FOR FEEDBACK ABOUT REQUIREMENTS
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // RESET ERROR CLASSES
    setRegPswValidClass("reg-err-msg");
    setRegPswMatchClass("reg-err-msg");
    setRegErrClass("reg-err-msg");

    // Collect data from from
    const formData = new FormData(e.currentTarget);
    // Collect inputs
    const userName = formData.get("username") as string;
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
    } else {
      setRegPswValidClass("reg-err-msg--active");
    }

    if (password === confirmPassword) {
      passwordMatch = true;
    } else {
      setRegPswMatchClass("reg-err-msg--active");
    }

    // REGISTER IF ALL CONDITIONS ARE MET
    if (passwordValid && passwordMatch) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // extract the user
          const user = userCredential.user;
          // Update with username
          updateProfile(user, { displayName: userName })
            .then(() => {
              setUser(user);
              navigate("/dashboard");
            })
            .catch((error: FirebaseError) => {
              console.log(error.code);
            });
        })
        .catch((error: FirebaseError) => {
          setRegErrMsg(error.code);
          setRegErrClass("reg-err-msg--active");
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

    // Check password length
    if (password.length >= 8) {
      validatePass.length = true;
    }
    // Check if it contains any capital letter
    if (/[A-Z]/.test(password)) {
      validatePass.uppercaseChar = true;
    }
    // Check if it contains a special character
    if (/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password)) {
      validatePass.specialChar = true;
    }
    // Check it it contains a number
    if (/[0-9]/.test(password)) {
      validatePass.number = true;
    }
    // Assign validation object to state variable
    setPasswordValidation(validatePass);
  }, [password]);

  return (
    <main>
      <form onSubmit={handleRegister} className="register-form">
        <h4>Please provide required data:</h4>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" required />
        <label htmlFor="email">Email adress:</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <label htmlFor="confirm-password">Repeat password:</label>
        <input type="password" name="confirm-password" required />
        <div>
          <p className={regPswMatchClass}>Passwords don't match!</p>
          <p className={regPswValidClass}>
            Password don't meet specified requirements!
          </p>
          <p className={regErrClass}>{regErrMsg}</p>
        </div>
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
