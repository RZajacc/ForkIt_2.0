import { db } from "../../../config/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { MouseEvent, useContext } from "react";
import { commentsType } from "../../../types/types";
import { formatDate } from "../../../utils/Utils";
import "./comment.scss";

type Props = {
  comment: commentsType;
};

function Comment({ comment }: Props) {
  const { user } = useContext(AuthContext);
  // Find if comment belongs to logged in user and if yes delete on click
  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const buttonVal = e.target as HTMLButtonElement;
    const q = query(
      collection(db, "Comments"),
      where("message", "==", buttonVal.value)
    );
    let docID = "";
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    await deleteDoc(doc(db, "Comments", docID));
  };

  return (
    <>
      <div>
        <div className="comment">
          <div className="comment__user-img">
            <img src={comment.picUrl} alt="profile-image" />
          </div>
          <div className="comment__body">
            <div className="comment__body__author">{comment.author}</div>
            <div className="comment__body__date">
              posted on: {formatDate(comment.date)}
            </div>
            <div className="comment__body__message">{comment.message}</div>
          </div>
        </div>

        <div className="actions">
          <div className="comment__delete">
            {comment.authorID === user?.uid ? (
              <button
                className="delete-comment-button"
                value={comment.message}
                onClick={handleDelete}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
