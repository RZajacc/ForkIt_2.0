type Props = {
  nameEdit: boolean;
  setNameEdit: (status: boolean) => void;
  passwordEdit: boolean;
  setPasswordEdit: (status: boolean) => void;
  deleteProfile: boolean;
  setDeleteProfile: (status: boolean) => void;
};

function UserActions({
  nameEdit,
  setNameEdit,
  passwordEdit,
  setPasswordEdit,
  deleteProfile,
  setDeleteProfile,
}: Props) {
  // ---------------USER UPDATE ACTIONS--------------------
  const handleUserNameEditDisplay = () => {
    if (nameEdit) {
      setNameEdit(false);
    } else {
      setNameEdit(true);
      setPasswordEdit(false);
      setDeleteProfile(false);
    }
  };

  // ---------------CHANGE PASSWORD--------------------
  const handleChangePasswordDisplay = () => {
    if (passwordEdit) {
      setPasswordEdit(false);
    } else {
      setPasswordEdit(true);
      setNameEdit(false);
      setDeleteProfile(false);
    }
  };

  // ------------DELETE PROFILE--------------
  const handleDeleteProfileDisplay = () => {
    if (deleteProfile) {
      setDeleteProfile(false);
    } else {
      setDeleteProfile(true);
      setNameEdit(false);
      setPasswordEdit(false);
    }
  };
  return (
    <div className="user-actions">
      <button onClick={handleUserNameEditDisplay}>Edit name</button>
      <button onClick={handleChangePasswordDisplay}>Change password</button>
      <button className="delete-profile" onClick={handleDeleteProfileDisplay}>
        Delete profile
      </button>
    </div>
  );
}

export default UserActions;
