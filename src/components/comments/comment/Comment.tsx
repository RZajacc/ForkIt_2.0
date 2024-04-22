import { commentsType } from "../../../types/types";
import { formatDate } from "../../../utils/Utils";
import { MouseEvent, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

type Props = {
  comment: commentsType;
};

function Comment({ comment }: Props) {
  const { user } = useContext(AuthContext);
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
    <div className="comment">
      <div className="comment__user-img">
        <img src={comment.picUrl} alt="profile-image" />
      </div>
      <div className="comment__body">
        <div className="comment__body__author">{comment.author}</div>
        <div className="comment__body__message">{comment.message}</div>
        <div className="comment__body__date">{formatDate(comment.date)}</div>
      </div>
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
  );
}

export default Comment;
