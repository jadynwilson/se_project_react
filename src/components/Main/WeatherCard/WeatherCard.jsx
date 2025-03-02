import "../WeatherCard/WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants";
import { useContext } from "react";
import CurrentTempUnitContext from "../../../contexts/CurrentTempUnit.jsx";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C}{" "}
        &deg;{currentTempUnit}{" "}
      </p>
      <img
        src={weatherOption?.url}
        alt={`An image showing the ${
          weatherOption?.day ? "day" : "night"
        } time with ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
