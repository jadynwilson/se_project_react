import "./ModalWithForm.css";
import close from "../../assets/closebutton.png";

function ModalWithForm({ activeModal, handleCloseClick }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close button" />
        </button>
        <form className="modal__form">
          <h2 className="modal__title">New Garment</h2>
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="imageURL"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                name="weather"
                value="hot"
                type="radio"
                className=" modal__radio-input"
              />{" "}
              <span className="modal__radio-text">Hot </span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                name="weather"
                value="warm"
                type="radio"
                className=" modal__radio-input"
              />
              <span className="modal__radio-text">Warm </span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                name="weather"
                value="cold"
                type="radio"
                className=" modal__radio-input"
              />
              <span className="modal__radio-text">Cold </span>
            </label>
          </fieldset>
          <button type="submit" className="modal__submit">
            Add Garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
