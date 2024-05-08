import { FormEvent, useContext, useEffect, useRef, useState } from "react";
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
import { deleteUser, updatePassword, updateProfile } from "firebase/auth";
import { passwordValidator } from "../../../utils/Utils";
import ProgressBar from "../../progressBar/ProgressBar";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function DashboardUser() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nameEdit, setNameEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  // ------UPDATE PASSWORD STATE VARS------------
  const [password, setPassword] = useState("");
  const [pswMatch, setPswMatch] = useState(true);
  const [pswStrength, setPswStrength] = useState({
    percentage: "",
    status: "",
  });
  const [pswChangeSuccess, setPswChangeSuccess] = useState(false);
  const [pswChangeErr, setPswChangeErr] = useState(false);
  // ------------------------------------------------
  const [deleteProfile, setDeleteProfile] = useState(false);
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

    // Create a reference to image library with image name
    const storageRef = ref(storage, `userImages/${imgName}`);

    if (userImg.size > 3000000) {
      setFileSizeErrorClass("file-size-error--active");
      setFileSizeError(userImg.size / 1000000);
      fileInputRef.current!.value = "";
    } else {
      const uploadTask = uploadBytesResumable(storageRef, userImg);
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

  const handleDeleteProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect data from from
    const formData = new FormData(e.currentTarget);
    // Collect inputs
    const confirmation = formData.get("confirm-delete") as string;

    if (confirmation === user!.displayName) {
      // Delete all user favs
      const favQuery = query(
        collection(db, "favourites"),
        where("userID", "==", user?.uid)
      );
      const favQuerySnapshot = await getDocs(favQuery);
      favQuerySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "favourites", document.id));
      });
      // Delete all user comments
      const commentsQuery = query(
        collection(db, "Comments"),
        where("authorID", "==", user?.uid)
      );
      const commentsQuerySnapshot = await getDocs(commentsQuery);
      commentsQuerySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "Comments", document.id));
        console.log("DOCID", document.id);
      });
      // Delete user image
      const storage = getStorage();
      const img = user?.photoURL as string;
      const deleteRef = ref(storage, img);
      if (img !== "/noUser.png") {
        deleteObject(deleteRef)
          .then(() => {
            console.log("Success");
          })
          .catch((error: FirebaseError) => {
            console.log("ERROR", error.message);
          });
      }
      // Delete user account
      deleteUser(user!)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
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
    <>
      <div className="user-image-container">
        <img src={userImg ? userImg : ""} />
      </div>
      <form
        onSubmit={handleFileSubmit}
        encType="multipart/form-data"
        className="user-image-form"
      >
        <input
          type="file"
          name="user-image"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
        />
        <small>*File is not supposed to be larger than 3Mb.</small>
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
      <div className="user-data">
        <p>
          <strong>Username: </strong>{" "}
          {user?.displayName ? user.displayName : "No user name assigned"}
        </p>
        <p>
          <strong>Email: </strong>{" "}
          {user?.email ? user.email : "Data not available"}
        </p>
        <p>
          <small>
            <strong>Active since: </strong>{" "}
            {user ? user.metadata.creationTime : "No data"}
          </small>
        </p>
        <p>
          <small>
            <strong>Last login: </strong>{" "}
            {user ? user.metadata.lastSignInTime : "No data"}
          </small>
        </p>
        {pswChangeSuccess ? (
          <div className="psw-change-success">
            <p>Password changed successfully!</p>
            <button
              onClick={() => {
                setPswChangeSuccess(false);
              }}
            >
              x
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="user-actions">
          <button onClick={handleUserNameEditDisplay}>Edit name</button>
          <button onClick={handleChangePasswordDisplay}>Change password</button>
          <button
            className="delete-profile"
            onClick={handleDeleteProfileDisplay}
          >
            Delete profile
          </button>
        </div>
        {nameEdit ? (
          <form className="update-form" onSubmit={handleUserNameSubmit}>
            <label htmlFor="new-user-name">New user name:</label>
            <input type="text" name="new-user-name" required />
            <button>Update</button>
          </form>
        ) : (
          ""
        )}
        {passwordEdit ? (
          <form className="update-form" onSubmit={handlePasswordSubmit}>
            <label htmlFor="new-password">New password:</label>
            <input
              type="password"
              name="new-password"
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
              minLength={8}
              required
            />
            {pswMatch ? (
              ""
            ) : (
              <p className="psw-change-err">Passwords don't match!</p>
            )}
            {pswChangeErr ? (
              <p className="psw-change-err">
                You've been logged in for a very long time. To continue you need
                to re-login to your account. Sorry!
              </p>
            ) : (
              ""
            )}
            <button>Update</button>
          </form>
        ) : (
          ""
        )}
        {deleteProfile ? (
          <form className="user-delete-form" onSubmit={handleDeleteProfile}>
            <h4>Are you sure you want to delete your profile?</h4>
            <p>
              If yes type you're username below and confirm with the button:
            </p>
            <div>
              <input type="text" name="confirm-delete" required />
              <button type="submit">Delete</button>
            </div>
            {pswChangeErr ? (
              <p className="psw-change-err">
                You've been logged in for a very long time. To continue you need
                to re-login to your account. Sorry!
              </p>
            ) : (
              ""
            )}
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DashboardUser;
