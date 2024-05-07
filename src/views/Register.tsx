import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import noUser from "/noUser.png";
import "../style/register.scss";
import ProgressBar from "../components/progressBar/ProgressBar";
import { passwordValidator } from "../utils/Utils";

function Register() {
  const { setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");

  const [registerStatus, setRegisterStatus] = useState(false);
  const [pswStrength, setPswStrength] = useState({
    percentage: "",
    status: "",
  });
  // FORM VALIDATION ERROR AND CLASSES
  const [regErrMsg, setRegErrMsg] = useState("");
  const [regPswValidClass, setRegPswValidClass] = useState("reg-err-msg");
  const [regPswMatchClass, setRegPswMatchClass] = useState("reg-err-msg");
  const [regErrClass, setRegErrClass] = useState("reg-err-msg");

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

    if (password.length >= 8) {
      passwordValid = true;
    } else {
      setRegPswValidClass("reg-err-msg--active");
      setRegisterStatus(false);
    }

    if (password === confirmPassword) {
      passwordMatch = true;
    } else {
      setRegPswMatchClass("reg-err-msg--active");
      setRegisterStatus(false);
    }

    // REGISTER IF ALL CONDITIONS ARE MET
    if (passwordValid && passwordMatch) {
      const auth = getAuth();
      // Create the user with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // extract the user
          const user = userCredential.user;
          // Update with username
          updateProfile(user, { displayName: userName, photoURL: noUser })
            .then(() => {
              sendEmailVerification(user).then(() => {
                setRegisterStatus(true);
                signOut(auth)
                  .then(() => {
                    setUser(null);
                  })
                  .catch((error: FirebaseError) => {
                    console.log(error.code);
                  });
              });
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
    const result = passwordValidator(password);
    setPswStrength(result);
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
        <small>*At least 8 characters long</small>
        {password.length !== 0 ? (
          <ProgressBar
            pswStrength={pswStrength.percentage}
            pswStatus={pswStrength.status}
          />
        ) : (
          ""
        )}
        <label htmlFor="confirm-password">Repeat password:</label>
        <input type="password" name="confirm-password" required />
        <div>
          <p className={regPswMatchClass}>Passwords don't match!</p>
          <p className={regPswValidClass}>Password is too short!</p>
          <p className={regErrClass}>{regErrMsg}</p>
        </div>
        {registerStatus ? (
          <p className="registration-status">
            Registration was successfull! To continue please confirm your email
            with the link that was sent to you.
          </p>
        ) : (
          ""
        )}
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
