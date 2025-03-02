import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile";
import { getItems, deleteItem, addItem } from "../../utils/Api.js";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [SelectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleDeleteClick = (card) => {
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    deleteItem(SelectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== SelectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newItem = { name, imageUrl, weather };
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();

        if (Array.isArray(items)) {
          const missingIdItems = items.filter((item) => !item._id);
          if (missingIdItems.length > 0) {
            console.error("Error: Some items are missing _id:", missingIdItems);
          }

          setClothingItems(items);
        } else {
          console.error("Received data is not an array:", items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onDelete={handleDeleteClick}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                  onDelete={handleDeleteClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onCloseClick={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <Footer />
        <ItemModal
          activeModal={activeModal}
          card={SelectedCard}
          onCloseClick={closeActiveModal}
          onDeleteClick={handleDeleteClick}
        />
        <DeleteConfirmModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
