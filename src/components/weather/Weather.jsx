import React from "react";
import { formatToLocalTime } from "../../services/weatherService";
import { iconUrlFromCode } from "../../services/weatherService";
import "./weather.css";
function Weather({
  weather: {
    dt,
    timezone,
    name,
    country,
    temp,
    temp_min,
    temp_max,
    humidity,
    speed,
    deg,
    icon,
    description,
  },
  units,
}) {
  const temperatureUnit = units === "metric" ? "°C" : "°F";
  return (
    <>
      <section className="weather-container">
        <aside className="weather-details">
          <h3>{formatToLocalTime(dt)}</h3>

          <h1>{`${name}, ${country}`}</h1>

          <p>{`Weather Details: ${description}`}</p>
          <p>{`Temp: ${temp}${temperatureUnit}`}</p>
          <p>
            {`Min Temp: ${temp_min}${temperatureUnit}, Max Temp: ${temp_max}${temperatureUnit}`}
          </p>
          <p>{`Wind: ${speed.toFixed()} km/h, Direction: ${deg.toFixed()}°`}</p>
          <p>{`Humidity: ${humidity.toFixed()}%`}</p>
          <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        </aside>
      </section>
    </>
  );
}

export default Weather;
