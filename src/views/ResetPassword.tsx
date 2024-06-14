import { useState } from "react";
import "../style/resetPassword.scss";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  const [resetSuccess, setResetSuccess] = useState(false);

  const actionCodeSettings = {
    url: "https://forkitorleaveit.netlify.app/login",
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create form data and collect its inputs
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    //  Get auth object and send reset password email
    const auth = getAuth();
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setResetSuccess(true);
      })
      .catch((error) => {
        setResetSuccess(false);
        console.log(error);
      });
  };

  return (
    <>
      <main>
        <form onSubmit={handleReset} className="reset-password-form">
          <h4>Reset password email will be sent to:</h4>
          <label htmlFor="email">Email adress:</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="enter your email"
            required
            onChange={() => {
              setResetSuccess(false);
            }}
          />
          <button type="submit">Submit</button>
          {resetSuccess ? (
            <p>
              Email was sent successfully. Check your mail box and follow
              instructions from there.
            </p>
          ) : (
            ""
          )}
        </form>
      </main>
    </>
  );
}

export default ResetPassword;
