import WeatherCard from "../Main/WeatherCard/WeatherCard";
import ItemCard from "../Main/ItemCard/ItemCard";
import "./Main.css";
function Main({ weatherData, onCardClick, clothingItems, onDelete }) {
  console.log("Weather Data in Main:", weatherData);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}° F / You may want to wear:
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
