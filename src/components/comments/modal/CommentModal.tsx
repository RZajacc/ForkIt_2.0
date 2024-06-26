import "./commentModal.scss";
import { modalContent } from "../../../types/types";

type Props = {
  modalClass: string;
  modalContent: modalContent;
  editTextClass: string;
  editedComment: string;
  setEditedComment: (comment: string) => void;
  handleConfirmButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelButton: () => void;
};

function CommentModal({
  modalClass,
  modalContent,
  editTextClass,
  editedComment,
  setEditedComment,
  handleConfirmButton,
  handleCancelButton,
}: Props) {
  return (
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
  );
}

export default CommentModal;
