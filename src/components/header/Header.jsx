import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import "./header.css";

const Header = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");
  const [icons, setIcons] = useState(["°C", "°F"]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);

      const newIcons = selectedUnit === "metric" ? ["°C", "°F"] : ["°F", "°C"];
      setIcons(newIcons);
    }
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <section className="header-container">
      <nav className="header-nav">
        <div className="header-navbox">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="Search For City"
            className="header-input"
          />
          <UilSearch className="header-icon" onClick={handleSearchClick} />
          <UilLocationPoint
            className="header-icon"
            onClick={handleLocationClick}
          />
        </div>

        <div className="header-right">
          <button
            name="metric"
            className="header-icon"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p>|</p>
          <button
            name="imperial"
            className="header-icon"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Header;
