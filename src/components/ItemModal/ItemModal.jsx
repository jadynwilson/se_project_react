import "./ItemModal.css";
import { createPortal } from "react-dom";

function ItemModal({ isOpen, card, onCloseClick, onDeleteClick }) {
  return createPortal(
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onCloseClick}>
          ✕
        </button>

        {card && (
          <>
            <img className="modal__image" src={card.link} alt={card.name} />

            <div className="modal__footer">
              <h2 className="modal__title">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>

              <button
                className="modal__delete-button"
                onClick={() => onDeleteClick(card)}
              >
                Delete Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ItemModal;
