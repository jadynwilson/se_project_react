import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import likeIcon from "../../../assets/heart.png";
import likedIcon from "../../../assets/likedheart.png";

function ItemCard({ item, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  const handleLike = () => {
    if (!currentUser) return;
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {currentUser && (
        <button className="card__like-button" onClick={handleLike}>
          <img
            src={isLiked ? likedIcon : likeIcon}
            alt={isLiked ? "Liked" : "Like"}
            className="card__like-icon"
          />
        </button>
      )}

      {onDelete && (
        <button className="card__delete-button" onClick={() => onDelete(item)}>
          Delete
        </button>
      )}
    </li>
  );
}

export default ItemCard;
