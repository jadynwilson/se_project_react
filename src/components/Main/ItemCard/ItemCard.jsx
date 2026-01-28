import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import likeIcon from "../../../assets/heart.png";
import likedIcon from "../../../assets/likedheart.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  const handleLike = (e) => {
    e.stopPropagation();
    if (!currentUser) return;
    onCardLike(item);
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>

      <img className="card__image" src={item.link} alt={item.name} />

      {currentUser && (
        <button className="card__like-button" onClick={handleLike}>
          <img
            src={isLiked ? likedIcon : likeIcon}
            alt={isLiked ? "Liked" : "Like"}
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
