import "./Header.css";

import logo from "../../assets/logo.svg"; // Import the logo
import avatar from "../../assets/avatar.png"; // Import the avatar

function Header({ handleAddClick, weatherData }) {
  const currentdate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-location">
        {currentdate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Jadyn Wilson</p>
        <img src={avatar} alt="Profile Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
