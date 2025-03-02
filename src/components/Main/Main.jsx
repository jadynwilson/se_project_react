import WeatherCard from "../Main/WeatherCard/WeatherCard";
import ItemCard from "../Main/ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";
function Main({ weatherData, onCardClick, clothingItems, onDelete }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C}{" "}
          &deg;{currentTempUnit} You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
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
      </section>
    </main>
  );
}

export default Main;
