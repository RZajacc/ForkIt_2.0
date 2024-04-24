import { db } from "../../../config/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
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
    // Get event target (value stores document id)
    const eventTarget = e.target as HTMLButtonElement;
    // Delete document with document ID
    await deleteDoc(doc(db, "Comments", eventTarget.value));
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
                value={comment.documentId}
                onClick={handleDelete}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="actions-modal">
          <div className="actions-modal__content">
            <section className="actions-modal__content__header">
              <h4>Header</h4>
            </section>
            <section className="actions-modal__content__body">
              <p>Body</p>
              {/* <textarea name="" id="" /> */}
            </section>
            <section className="actions-modal__content__footer">
              <button className="modal-submit-button">Submit</button>
              <button className="modal-cancel-button">Cancel</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
