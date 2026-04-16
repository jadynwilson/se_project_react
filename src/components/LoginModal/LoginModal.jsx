import React from "react";
import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm.css";
import close from "../../assets/closebutton.png";
import useForm from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onCloseClick,
  onLogin,
  onRegisterClick,
  loginError,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
    resetForm();
  };

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <button onClick={onCloseClick} className="modal__close">
          <img src={close} alt="close" />
        </button>

        <h2 className="modal__title">Log In</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Email
            <input
              type="email"
              name="email"
              className="modal__input"
              placeholder="Email"
              value={values.email}
              required
              onChange={handleChange}
            />
          </label>

          <label
            className={`modal__label ${loginError ? "modal__label_error" : ""}`}
          >
            {loginError ? loginError : "Password"}
            <input
              type="password"
              name="password"
              className="modal__input"
              placeholder="Password"
              value={values.password}
              required
              onChange={handleChange}
            />
          </label>

          <div className="modal__footer">
            <button type="submit" className="modal__submit">
              Log In
            </button>
            <button
              type="button"
              className="modal__login-link"
              onClick={onRegisterClick}
            >
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
