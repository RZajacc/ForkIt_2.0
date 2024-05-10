import { FirebaseError } from "firebase/app";
import { User, deleteUser, getAuth, signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { FormEvent, useState } from "react";
import { db } from "../../../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
  setUser: (user: User | null) => void;
};

function DeleteProfile({ user, setUser }: Props) {
  const navigate = useNavigate();
  const [authErr, setAuthErr] = useState(false);
  const [userNameErr, setUserNameErr] = useState(false);
  const handleDeleteProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect data from from
    const formData = new FormData(e.currentTarget);
    // Collect inputs
    const confirmation = formData.get("confirm-delete") as string;

    if (confirmation === user!.displayName) {
      const auth = getAuth();
      // Delete user account
      deleteUser(user!)
        .then(async () => {
          // DELETE ALL USERS DATA

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
          // Signout the user
          signOut(auth)
            .then(() => {
              setUser(null);
              navigate("/");
            })
            .catch((error: FirebaseError) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          setAuthErr(true);
          console.log(error);
        });
    } else {
      setUserNameErr(true);
    }
  };
  return (
    <form className="user-delete-form" onSubmit={handleDeleteProfile}>
      <h4>Are you sure you want to delete your profile?</h4>
      <p>If yes type you're username below and confirm with the button:</p>
      <div>
        <input
          type="text"
          name="confirm-delete"
          required
          onChange={() => {
            setUserNameErr(false);
          }}
        />
        <button type="submit">Delete</button>
      </div>
      {authErr ? (
        <p className="psw-change-err">
          You've been logged in for a very long time. To continue you need to
          re-login to your account. Sorry!
        </p>
      ) : (
        ""
      )}
      {userNameErr ? (
        <p className="psw-change-err">It's not your user name!Try again 😊 </p>
      ) : (
        ""
      )}
    </form>
  );
}

export default DeleteProfile;
