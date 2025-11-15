import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, onAddClick, clothingItems, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Only show items owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__button"
          onClick={onAddClick}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="clothes-section__empty">
            You haven’t added any items yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
