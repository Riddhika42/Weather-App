import { DateTime } from "luxon";

const API_KEY = "1a8fa74a4af70165d26e12bfae3bae98";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch weather data. Please try again.");
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main,
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed, deg },
  } = data;

  const { temp, feels_like, temp_min, temp_max, humidity } = main || {};

  const { main: details, icon, description } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    deg,
    description,
  };
};

const formatForecastWeather = (data) => {
  const { timezone, daily, hourly } = data;

  const formatDailyForecast = (d) => ({
    title: formatToLocalTime(d.dt, timezone, "cccc"),
    date: formatToLocalTime(d.dt, timezone, "yyyy-MM-dd"),
    temp: d.temp.day,
    icon: d.weather[0].icon,
    details: d.weather[0].main,
    description: d.weather[0].description,
  });

  const formatHourlyForecast = (d) => ({
    title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
    temp: d.temp,
    icon: d.weather[0].icon,
    details: d.weather[0].main,
  });

  const formattedDaily = daily.slice(1, 6).map(formatDailyForecast);
  const formattedHourly = hourly.slice(1, 6).map(formatHourlyForecast);

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
