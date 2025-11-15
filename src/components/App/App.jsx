import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Profile from "../Profile/Profile";
import * as auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const closeActiveModal = () => setActiveModal("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => setActiveModal("add-garment");
  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };
  const openEditProfile = () => setIsEditProfileOpen(true);
  const closeEditProfile = () => setIsEditProfileOpen(false);

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newItem = { name, imageUrl, weather };
    addItem(newItem, localStorage.getItem("jwt"))
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    deleteItem(selectedCard._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => auth.authorize({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        checkToken();
        closeActiveModal();
      })
      .catch((err) => console.error("Error registering user:", err));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        checkToken();
        closeActiveModal();
      })
      .catch((err) => console.error("Error logging in:", err));
  };

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          setIsLoggedIn(false);
        });
    }
  };

  const handleUpdateUser = ({ name, avatar }) => {
    auth
      .updateUser({ name, avatar }, localStorage.getItem("jwt"))
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeEditProfile();
      })
      .catch(console.error);
  };

  const handleCardLike = (card) => {
    if (!currentUser) return;

    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.some((id) => id === currentUser._id);

    if (!isLiked) {
      addCardLike(card._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === card._id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(card._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === card._id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);

    useEffect(() => {
      checkToken();

      getWeather(coordinates, APIkey)
        .then((data) => setWeatherData(filterWeatherData(data)))
        .catch(console.error);

      const fetchItems = async () => {
        try {
          const items = await getItems();
          if (Array.isArray(items)) {
            setClothingItems(items);
          } else {
            console.error("Items data is not an array:", items);
          }
        } catch (err) {
          console.error("Error fetching items:", err);
        }
      };
      fetchItems();
    }, []);

    useEffect(() => {
      if (!activeModal) return;
      const handleEsc = (e) => {
        if (e.key === "Escape") closeActiveModal();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [activeModal]);

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onDelete={handleDeleteClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isLoggedIn ? (
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        onDelete={handleDeleteClick}
                        openEditProfile={openEditProfile}
                        onCardLike={handleCardLike}
                        onSignOut={handleSignOut}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              </Routes>
            </div>

            {/* Modals */}
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onCloseClick={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onCloseClick={closeActiveModal}
              onRegister={handleRegister}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onCloseClick={closeActiveModal}
              onLogin={handleLogin}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onCloseClick={closeActiveModal}
              onDeleteClick={handleDeleteClick}
            />
            <DeleteConfirmModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onConfirm={handleConfirmDelete}
            />
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onCloseClick={closeEditProfile}
              onUpdateUser={handleUpdateUser}
              currentUser={currentUser}
            />
            <Footer />
          </div>
        </CurrentTempUnitContext.Provider>
      </CurrentUserContext.Provider>
    );
  };
}
export default App;
