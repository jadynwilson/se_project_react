import React, { useContext } from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  onCardClick,
  onCardLike,
  onDelete,
  clothingItems,
  onEditProfile,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const avatarPlaceholder = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "?";

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <div className="profile__user-info">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          ) : (
            <div className="profile__avatar-placeholder">
              {avatarPlaceholder}
            </div>
          )}
          <h2 className="profile__name">{currentUser?.name}</h2>
          <button
            onClick={onEditProfile}
            className="profile__edit-btn"
            type="button"
          >
            Edit Profile
          </button>
          <button
            onClick={onLogout}
            className="profile__signout-btn"
            type="button"
          >
            Log Out
          </button>
        </div>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onDelete={onDelete}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
