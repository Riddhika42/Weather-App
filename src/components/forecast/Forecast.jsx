import React from "react";
import { iconUrlFromCode } from "../../services/weatherService";
import "./forecast.css";

function Forecast({ title, items, units }) {
  const temperatureUnit = units === "metric" ? "°C" : "°F";

  return (
    <section className="forecast-container">
      <h1>{title}</h1>
      <hr />

      <aside className="forecast-subcontainer">
        {items.map((item, index) => (
          <div className="forecast-day" key={index}>
            <p>{item.title}</p>
            <p>{item.date}</p>
            <img src={iconUrlFromCode(item.icon)} alt="" />
            <p>Avg Temp: {`${item.temp.toFixed()}${temperatureUnit}`}</p>
            <p>{`Weather Details: ${item.description}`}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}

export default Forecast;
