import "./App.css";
import Header from "./components/header/Header";
import Weather from "./components/weather/Weather";
import Forecast from "./components/forecast/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );

          setWeather(data);
        })
        .catch((error) => {
          toast.error(`Bad Luck !! No City exists`);
        });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <>
      <ToastContainer />
      <Header setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <Weather weather={weather} units={units} />
          <Forecast
            title="daily forecast"
            items={weather.daily}
            units={units}
          />
        </div>
      )}
    </>
  );
}

export default App;
