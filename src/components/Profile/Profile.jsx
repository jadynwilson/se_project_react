import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, onAddClick, onDeleteItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          onDeleteItem={onDeleteItem}
        />
      </section>
    </div>
  );
}

export default Profile;
