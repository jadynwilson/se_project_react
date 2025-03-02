import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick, onAddClick, clothingItems, onDelete }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
