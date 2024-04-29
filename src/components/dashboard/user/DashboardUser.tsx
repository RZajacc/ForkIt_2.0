import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import "./dashboard-user.scss";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function DashboardUser() {
  const { user } = useContext(AuthContext);

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userImg = formData.get("user-image") as File;

    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const profilePics = ref(storage, `userImages/${userImg.name}`);

    // // 'file' comes from the Blob or File API
    uploadBytes(profilePics, userImg)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(formData.get("user-image"));
  };
  return (
    <>
      <div className="user-image-container">
        <img src={user?.photoURL ? user.photoURL : ""} />
      </div>
      <form onSubmit={handleFileSubmit} encType="multipart/form-data">
        <input type="file" name="user-image" accept="image/png, image/jpeg" />
        <button type="submit">Upload</button>
      </form>
      <div>
        <p>
          <strong>Username: </strong>{" "}
          {user?.displayName ? user.displayName : "No user name assigned"}
        </p>
        <p>
          <strong>Email: </strong>{" "}
          {user?.email ? user.email : "Data not available"}
        </p>
        <p>
          <strong>Active since: </strong>{" "}
          {user ? user.metadata.creationTime : "No data"}
        </p>
        <p>
          <strong>Last login: </strong>{" "}
          {user ? user.metadata.lastSignInTime : "No data"}
        </p>
      </div>
    </>
  );
}

export default DashboardUser;
