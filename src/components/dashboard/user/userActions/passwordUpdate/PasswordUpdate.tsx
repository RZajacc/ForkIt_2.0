import { User, updatePassword } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { passwordValidator } from "../../../../../utils/Utils";
import ProgressBar from "../../../../progressBar/ProgressBar";

type Props = {
  user: User;
  setUser: (user: User) => void;
  setPasswordEdit: (status: boolean) => void;
  setPswChangeSuccess: (status: boolean) => void;
};

function PasswordUpdate({
  user,
  setUser,
  setPasswordEdit,
  setPswChangeSuccess,
}: Props) {
  const [password, setPassword] = useState("");
  const [pswMatch, setPswMatch] = useState(true);
  const [pswStrength, setPswStrength] = useState({
    percentage: "",
    status: "",
  });
  //   const [pswChangeSuccess, setPswChangeSuccess] = useState(false);
  const [pswChangeErr, setPswChangeErr] = useState(false);
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect data from from
    const formData = new FormData(e.currentTarget);
    // Collect inputs
    const password = formData.get("new-password") as string;
    const confirmPassword = formData.get("new-password-confirm") as string;

    if (password !== confirmPassword) {
      setPswMatch(false);
    } else {
      setPswMatch(true);

      updatePassword(user!, password)
        .then(() => {
          setUser(user);
          setPasswordEdit(false);
          setPswChangeSuccess(true);
          setPassword("");
        })
        .catch((error) => {
          // SET ERROR
          setPswChangeErr(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const result = passwordValidator(password);
    setPswStrength(result);
  }, [password]);

  return (
    <form className="update-form" onSubmit={handlePasswordSubmit}>
      <label htmlFor="new-password">New password:</label>
      <input
        type="password"
        name="new-password"
        id="new-password"
        minLength={8}
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <small>*Password has to be min 8 characters long</small>
      {password.length > 0 ? (
        <ProgressBar
          pswStrength={pswStrength.percentage}
          pswStatus={pswStrength.status}
        />
      ) : (
        ""
      )}
      <label htmlFor="new-password-confirm">Confirm password:</label>
      <input
        type="password"
        name="new-password-confirm"
        id="new-password-confirm"
        minLength={8}
        required
      />
      {pswMatch ? "" : <p className="psw-change-err">Passwords don't match!</p>}
      {pswChangeErr ? (
        <p className="psw-change-err">
          You've been logged in for a very long time. To continue you need to
          re-login to your account. Sorry!
        </p>
      ) : (
        ""
      )}
      <button>Update</button>
    </form>
  );
}

export default PasswordUpdate;
