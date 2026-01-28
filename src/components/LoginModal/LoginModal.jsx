import React, { useState } from "react";
import "./LoginModal.css";
import close from "../../assets/closebutton.png";

function LoginModal({ isOpen, onCloseClick, onLogin, onOpen }) {
  if (!isOpen) return null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onCloseClick} className="modal__close">
          <img src={close} alt="close" />
        </button>

        <h2 className="modal__title">Log In</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="modal__submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
