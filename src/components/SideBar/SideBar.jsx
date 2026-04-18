import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarPlaceholder = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "?";

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="profile__avatar"
        />
      ) : (
        <div className="profile__avatar-placeholder">{avatarPlaceholder}</div>
      )}
      <h2 className="profile__name">{currentUser?.name}</h2>
      <button
        onClick={onEditProfile}
        className="profile__edit-btn"
        type="button"
      >
        Change profile data
      </button>
      <button onClick={onLogout} className="profile__signout-btn" type="button">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
