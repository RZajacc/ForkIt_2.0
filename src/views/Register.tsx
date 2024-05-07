import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
  updateProfile,
  validatePassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import noUser from "/noUser.png";
import "../style/register.scss";
import ProgressBar from "../components/progressBar/ProgressBar";

function Register() {
  const { setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercaseChar: false,
    number: false,
    specialChar: false,
  });
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
    // Handle validation of the password
    const validatePass = {
      length: false,
      uppercaseChar: false,
      number: false,
      specialChar: false,
    };

    let counter = 0;

    type pass = {
      [n: number]: { [val: string]: string };
    };
    const passwordStrength: pass = {
      0: { percentage: "0%", status: "Very weak" },
      1: { percentage: "25%", status: "Weak" },
      2: { percentage: "50%", status: "Moderate" },
      3: { percentage: "75%", status: "Strong" },
      4: { percentage: "100%", status: "Very strong" },
    };

    // Check password length
    if (password.length >= 8) {
      validatePass.length = true;
      counter += 1;
    }
    // Check if it contains any capital letter
    if (/[A-Z]/.test(password) && validatePass.length) {
      validatePass.uppercaseChar = true;
      counter += 1;
    }
    // Check if it contains a special character
    if (
      /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password) &&
      validatePass.length
    ) {
      validatePass.specialChar = true;
      counter += 1;
    }
    // Check it it contains a number
    if (/[0-9]/.test(password) && validatePass.length) {
      validatePass.number = true;
      counter += 1;
    }

    setPswStrength({
      percentage: passwordStrength[counter].percentage,
      status: passwordStrength[counter].status,
    });
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
          <p className={regPswValidClass}>
            Password don't meet specified requirements!
          </p>
          <p className={regErrClass}>{regErrMsg}</p>
        </div>
        <button type="submit">Register</button>
        {registerStatus ? (
          <p className="registration-status">
            Registration was successfull! To continue please confirm your email
            with the link that was sent to you.
          </p>
        ) : (
          ""
        )}
      </form>
    </main>
  );
}

export default Register;
