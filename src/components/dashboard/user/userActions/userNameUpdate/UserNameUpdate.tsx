import { User, updateProfile } from "firebase/auth";
import { FormEvent } from "react";

type Props = {
  user: User;
  setUser: (user: User) => void;
  setNameEdit: (state: boolean) => void;
};

function UserNameUpdate({ user, setUser, setNameEdit }: Props) {
  const handleUserNameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create form data and collect its inputs
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("new-user-name") as string;

    updateProfile(user!, {
      displayName: userName,
    })
      .then(() => {
        setUser(user);
        setNameEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="update-form" onSubmit={handleUserNameSubmit}>
      <label htmlFor="new-user-name">New user name:</label>
      <input type="text" id="new-user-name" name="new-user-name" required />
      <button>Update</button>
    </form>
  );
}

export default UserNameUpdate;
