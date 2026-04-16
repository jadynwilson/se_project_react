import React from "react";
import "./RegisterModal.css";
import "../ModalWithForm/ModalWithForm.css";
import close from "../../assets/closebutton.png";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onCloseClick, onRegister, onLoginClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
    resetForm();
  };

  return (
    <div className="modal modal_opened register-modal">
      <div className="modal__content">
        <button onClick={onCloseClick} className="modal__close">
          <img src={close} alt="close" />
        </button>

        <h2 className="modal__title">Sign Up</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Email*
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

          <label className="modal__label">
            Password*
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

          <label className="modal__label">
            Name*
            <input
              type="text"
              name="name"
              className="modal__input"
              placeholder="Name"
              value={values.name}
              required
              onChange={handleChange}
            />
          </label>

          <label className="modal__label">
            Avatar URL*
            <input
              type="url"
              name="avatar"
              className="modal__input"
              placeholder="Avatar URL"
              value={values.avatar}
              onChange={handleChange}
            />
          </label>

          <div className="modal__footer">
            <button type="submit" className="modal__submit">
              Sign Up
            </button>
            <button
              type="button"
              className="modal__login-link"
              onClick={onLoginClick}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
