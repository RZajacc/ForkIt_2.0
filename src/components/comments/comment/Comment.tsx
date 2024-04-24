import { db } from "../../../config/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { MouseEvent, useContext, useState } from "react";
import { commentsType } from "../../../types/types";
import { formatDate } from "../../../utils/Utils";
import "./comment.scss";

type Props = {
  comment: commentsType;
};

function Comment({ comment }: Props) {
  const { user } = useContext(AuthContext);
  const [modalContent, setModalContent] = useState({
    header: "",
    body: "",
    confirmButton: "",
    cancelButton: "",
  });
  const [modalClass, setModalClass] = useState("actions-modal");
  const [editTextClass, setEditTextClass] = useState("edit-comment-text");
  const [documentId, setDocumentId] = useState("");
  const [editedComment, setEditedComment] = useState(comment.message);

  // Find if comment belongs to logged in user and if yes delete on click
  const handleModal = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // Define what action is requested - edit or delete
    const eventTarget = e.target as HTMLButtonElement;
    const requestedAction = eventTarget.innerText;
    const documentId = eventTarget.value;

    // Assign requested document value to continue further
    setDocumentId(documentId);

    if (requestedAction === "Delete") {
      setModalContent({
        header: "Are you sure?",
        body: "Deleting has permanent effect, you cannot take it back!",
        confirmButton: "Delete",
        cancelButton: "Cancel",
      });
      setModalClass("actions-modal display-block");
      setEditTextClass("edit-comment-text");
    } else if (requestedAction === "Edit") {
      setModalContent({
        header: "Edit comment:",
        body: "",
        confirmButton: "Edit",
        cancelButton: "Cancel",
      });
      setModalClass("actions-modal display-block");
      setEditTextClass("edit-comment-text display-block");
    }
  };

  const handleConfirmButton = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // Define what action is requested - edit or delete
    const eventTarget = e.target as HTMLButtonElement;
    const requestedAction = eventTarget.value;

    if (requestedAction === "Delete") {
      // Delete document with document ID
      await deleteDoc(doc(db, "Comments", documentId));
      // Reset document ID
      setDocumentId("");
      // Hide modal
      setModalClass("actions-modal");
    } else if (requestedAction === "Edit") {
      // Get document reference
      const editDocRef = doc(db, "Comments", documentId);
      // Update message field of the object
      await updateDoc(editDocRef, {
        message: editedComment,
      });
      // Reset document ID
      setDocumentId("");
      // Hide modal
      setModalClass("actions-modal");
    }
  };

  const handleCancelButton = () => {
    // Hide modal and reset documentId
    setModalClass("actions-modal");
    setDocumentId("");
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

        {/* USER ACTIONS */}
        <div className="actions">
          <div className="comment__delete">
            {comment.authorID === user?.uid ? (
              <>
                <button
                  className="delete-comment-button"
                  value={comment.documentId}
                  onClick={handleModal}
                >
                  Delete
                </button>
                <button
                  className="edit-comment-button"
                  value={comment.documentId}
                  onClick={handleModal}
                >
                  Edit
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* MODAL FOR ACTIONS */}
        <div className={modalClass}>
          <div className="actions-modal__content">
            <section className="actions-modal__content__header">
              <h4>{modalContent.header}</h4>
            </section>
            <section className="actions-modal__content__body">
              <p>{modalContent.body}</p>
              <textarea
                className={editTextClass}
                rows={3}
                value={editedComment}
                onChange={(e) => {
                  setEditedComment(e.target.value);
                }}
              />
            </section>
            <section className="actions-modal__content__footer">
              <button
                className="modal-submit-button"
                value={modalContent.confirmButton}
                onClick={handleConfirmButton}
              >
                {modalContent.confirmButton}
              </button>
              <button
                className="modal-cancel-button"
                value={modalContent.cancelButton}
                onClick={handleCancelButton}
              >
                {modalContent.cancelButton}
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
