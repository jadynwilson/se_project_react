import "./ModalWithForm.css";
import close from "../../assets/closebutton.png";

function ModalWithForm({
  buttonText,
  children,
  title,
  isOpen,
  activeModal,
  onCloseClick,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onCloseClick} type="button" className="modal__close">
          <img src={close} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
