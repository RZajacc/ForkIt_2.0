import { db } from "../../../config/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { commentsType, modalContent } from "../../../types/types";
import { formatDate } from "../../../utils/Utils";
import "./comment.scss";
import CommentModal from "../modal/CommentModal";

type Props = {
  comment: commentsType;
};

function Comment({ comment }: Props) {
  const { user } = useContext(AuthContext);
  const [modalContent, setModalContent] = useState<modalContent>({
    header: "",
    body: "",
    cancelButton: "",
    confirmButton: "",
  });
  const [modalClass, setModalClass] = useState("actions-modal");
  const [editTextClass, setEditTextClass] = useState("edit-comment-text");
  const [documentId, setDocumentId] = useState("");
  const [editedComment, setEditedComment] = useState(comment.message);

  // Find if comment belongs to logged in user and if yes delete on click
  const handleModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Define what action is requested - edit or delete
    const eventTarget = e.target as HTMLButtonElement;
    const requestedAction = eventTarget.innerText;
    const documentId = eventTarget.value;

    // Assign requested document value to continue further
    setDocumentId(documentId);
    // Everytime modal is opened edited text should be updated accordingly
    setEditedComment(comment.message);

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
        confirmButton: "Submit",
        cancelButton: "Cancel",
      });
      setModalClass("actions-modal display-block");
      setEditTextClass("edit-comment-text display-block");
    }
  };

  const handleConfirmButton = async (
    e: React.MouseEvent<HTMLButtonElement>
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
    } else if (requestedAction === "Submit") {
      // Get document reference
      const editDocRef = doc(db, "Comments", documentId);
      // Update message field of the object
      await updateDoc(editDocRef, {
        message: editedComment,
        edited: new Date(),
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
              {comment.edited ? "Edited" : "Posted on"}:{" "}
              {comment.edited
                ? formatDate(comment.edited)
                : formatDate(comment.date)}
            </div>
            <div className="comment__body__message">{comment.message}</div>
          </div>
        </div>

        {/* USER ACTIONS */}
        <div className="actions">
          <div className="comment__actions">
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
        <CommentModal
          modalClass={modalClass}
          modalContent={modalContent}
          editTextClass={editTextClass}
          editedComment={editedComment}
          setEditedComment={setEditedComment}
          handleConfirmButton={handleConfirmButton}
          handleCancelButton={handleCancelButton}
        />
      </div>
    </>
  );
}

export default Comment;
