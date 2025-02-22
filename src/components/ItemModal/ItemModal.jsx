import "./ItemModal.css";
import close from "../../assets/closebutton.png";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteClick }) {
  const handleDelete = () => {
    onDeleteClick();
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type-image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close button" />
        </button>
        <img src={card.imageUrl} alt="Clothing item" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            onClick={onDeleteClick}
            className="modal__delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
