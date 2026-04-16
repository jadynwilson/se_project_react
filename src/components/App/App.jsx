import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
  updateCurrentUser,
} from "../../utils/Api";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openModal = (modalName) => {
    console.log("OPEN MODAL:", modalName);
    setActiveModal(modalName);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    openModal("confirm-delete");
  };

  const handleDeleteConfirm = () => {
    if (!selectedCard) return;
    deleteItem(selectedCard._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (card) => {
    const token = localStorage.getItem("jwt");
    if (!token || !currentUser) return;
    const isLiked = card.likes?.includes(currentUser._id);
    const request = isLiked ? removeCardLike : addCardLike;
    request(card._id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === card._id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    setLoginError("");
    auth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return auth.getUserData(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        setLoginError("Incorrect email or password");
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateCurrentUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth
      .getUserData(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    getItems(token).then(setClothingItems).catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              onOpen={openModal}
              handleAddClick={() => openModal("add-item")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
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
                      onCardLike={handleCardLike}
                      onDelete={handleDeleteClick}
                      onLogout={handleLogout}
                      onEditProfile={() => openModal("edit-profile")}
                      onAddClick={() => openModal("add-item")}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onCloseClick={closeActiveModal}
            onDeleteClick={() => openModal("confirm-delete")}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={handleDeleteConfirm}
          />
          <AddItemModal
            isOpen={activeModal === "add-item"}
            onCloseClick={closeActiveModal}
            onAddItemModalSubmit={handleAddItem}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onCloseClick={() => {
              setLoginError("");
              closeActiveModal();
            }}
            onLogin={handleLogin}
            onRegisterClick={() => openModal("register")}
            loginError={loginError}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onCloseClick={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={() => openModal("login")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseClick={closeActiveModal}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
          <Footer />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
