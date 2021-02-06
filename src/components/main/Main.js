import React, { useState } from "react";
import NavBar from "../navbar";
import WeatherCard from "../weathercard";
import Daily from "../daily/Daily";
import Hourly from "../hourly/Hourly";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const Main = ({
  screenWidth,
  unit,
  setUnit,
  location,
  locationDetails,
  currentDetails,
  countryName,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <NavBar
        city={location}
        temp={locationDetails.current.temp}
        setUnit={setUnit}
      />
      <main>
        <WeatherCard
          city={location}
          dt={locationDetails.current.dt}
          timezone_offset={locationDetails.timezone_offset}
          details={currentDetails}
          country={countryName}
        />
        <div className="btn-container">
          <button
            className={`tab-btn ${selectedTab === 0 && "active-btn"}`}
            onClick={() => handleChange(0)}
          >
            Daily
          </button>
          <button
            className={`tab-btn ${selectedTab === 1 && "active-btn"}`}
            onClick={() => handleChange(1)}
          >
            Hourly
          </button>
        </div>
        <div className="main-container">
          {selectedTab === 0 && (
            <Daily
              details={locationDetails}
              location={location}
              screenWidth={screenWidth}
              unit={unit}
            />
          )}
          {selectedTab === 1 && (
            <Hourly
              details={locationDetails.hourly}
              timezone_offset={locationDetails.timezone_offset}
              screenWidth={screenWidth}
              unit={unit}
            />
          )}
          <Map
            latitude={currentDetails.coord.lat}
            longitude={currentDetails.coord.lon}
          />
        </div>
      </main>
    </>
  );
};
const Map = ({ latitude, longitude }) => {
  const position = [latitude, longitude];
  return (
    <MapContainer center={position} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=2c0a3c0e504032c9e73c695b431c4624`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=2c0a3c0e504032c9e73c695b431c4624`}
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Main;
