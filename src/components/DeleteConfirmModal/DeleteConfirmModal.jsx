import React from "react";
import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal__opened">
      <div className="modal__content">
        <h2>Are you sure you want to delete this item?</h2>
        <button
          onClick={() => {
            console.log("confirm button clicked");
            onConfirm();
          }}
          className="modal__confirm-button"
        >
          Confirm
        </button>
        <button onClick={onClose} className="modal__cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
