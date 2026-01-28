import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, onOpen, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const currentdate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const avatarPlaceholder = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "?";

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-location">
        {currentdate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {avatarPlaceholder}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={() => onOpen("login")} type="button">
            Log In
          </button>
          <button onClick={() => onOpen("register")} type="button">
            Register
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
