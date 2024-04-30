import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 } from "uuid";
import "./dashboard-user.scss";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";

function DashboardUser() {
  const { user, setUser } = useContext(AuthContext);
  const [fileSizeError, setFileSizeError] = useState(0);
  const [fileSizeErrorClass, setFileSizeErrorClass] = useState(
    "upload-progress--hidden"
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressClass, setUploadProgressClass] = useState(
    "upload-progress--hidden"
  );
  const [uploadError, setUploadError] = useState("");
  const [uploadErrorClass, setUploadErrorClass] = useState(
    "upload-progress--hidden"
  );
  const [userImg, setUserImg] = useState(user?.photoURL);

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Preparing form data
    const formData = new FormData(e.currentTarget);
    const userImg = formData.get("user-image") as File;

    // Designing image resulting name
    const imgNameSplit = userImg.name.split(".");
    const imgName = imgNameSplit[0] + "_" + v4() + "." + imgNameSplit[1];

    // Resetting classes
    setUploadErrorClass("upload-progress--hidden");
    setFileSizeErrorClass("upload-progress--hidden");

    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const storageRef = ref(storage, `userImages/${imgName}`);

    const uploadTask = uploadBytesResumable(storageRef, userImg);

    if (userImg.size > 3000000) {
      setFileSizeErrorClass("file-size-error--active");
      setFileSizeError(userImg.size / 1000000);
    } else {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          setUploadProgressClass("upload-progress--active");
        },
        (error: FirebaseError) => {
          setUploadErrorClass("upload-error--active");
          setUploadError(error.message);
        },
        () => {
          setUploadProgressClass("upload-progress--hidden");
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              const userImageURL = user?.photoURL;
              // If its default one only update the link but if custom, delete previous one
              if (userImageURL === "/noUser.png") {
                updateProfile(user!, { photoURL: downloadURL }).then(() => {
                  setUser(user);
                  setUserImg(downloadURL);
                });
              } else {
                updateProfile(user!, { photoURL: downloadURL }).then(() => {
                  setUser(user);
                  setUserImg(downloadURL);
                });
                const img = user?.photoURL as string;
                const deleteRef = ref(storage, img);
                deleteObject(deleteRef)
                  .then(() => {
                    console.log("Success");
                  })
                  .catch((error: FirebaseError) => {
                    console.log("ERROR", error.message);
                  });
              }
            }
          );
        }
      );
    }
  };
  return (
    <>
      <div className="user-image-container">
        <img src={userImg ? userImg : ""} />
      </div>
      <form
        onSubmit={handleFileSubmit}
        encType="multipart/form-data"
        className="user-image-form"
      >
        <input type="file" name="user-image" accept="image/png, image/jpeg" />
        <small>*File is not supposed to be bigger than 3Mb.</small>
        <button type="submit">Upload</button>
      </form>
      <div>
        <p className={uploadProgressClass}>
          Upload progress: <span>{Math.floor(uploadProgress) + "%"}</span>
        </p>
        <p className={uploadErrorClass}>{uploadError}</p>
        <p className={fileSizeErrorClass}>
          Your file is too big! <span>It's {fileSizeError.toFixed(1)} Mb!</span>
        </p>
      </div>
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
