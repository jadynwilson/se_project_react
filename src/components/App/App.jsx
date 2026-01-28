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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openModal = (modalName) => {
    console.log("OPEN MODAL:", modalName);
    setActiveModal(modalName);
  };
  const handleCardClick = (card) => {
    console.log("CARD CLICKED:", card);
    setSelectedCard(card);
    openModal("preview");
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
    auth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
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

    getItems(token).then(setClothingItems).catch(console.error);
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitContext.Provider value={{ currentTempUnit }}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              onOpen={openModal}
              handleAddClick={handleCardClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
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
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>

          <ItemModal
            isOpen={true}
            card={{
              name: "TEST ITEM",
              weather: "test",
              link: "https://picsum.photos/400",
            }}
            onCloseClick={closeActiveModal}
            onDeleteClick={() => {}}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
          />

          <AddItemModal
            isOpen={activeModal === "add-item"}
            onCloseClick={closeActiveModal}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onCloseClick={closeActiveModal}
            onLogin={handleLogin}
            onOpen={openModal}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onCloseClick={closeActiveModal}
            onRegister={handleRegister}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseClick={closeActiveModal}
            currentUser={currentUser}
          />

          <Footer />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
