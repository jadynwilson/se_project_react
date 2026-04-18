import "./ItemModal.css";
import { createPortal } from "react-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onCloseClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser._id;

  return createPortal(
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onCloseClick}>
          ✕
        </button>

        {card && (
          <>
            <img
              className="modal__image"
              src={card.imageUrl || card.link}
              alt={card.name}
            />

            <div className="modal__footer">
              <div className="modal__footer-info">
                <h2 className="modal__title">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
              </div>
              {isOwner && (
                <button
                  className="modal__delete-button"
                  onClick={() => onDeleteClick(card)}
                >
                  Delete Item
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ItemModal;
