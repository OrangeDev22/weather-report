import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import Daily from "./Daily";
import Hourly from "./Hourly";
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

const App = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [locationDetails, setLocationDetails] = useState([]);
  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";
  //const { loading, details } = useFetch(url);

  const unit = "celcius";
  const getClientDetails = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setDetails(data);
    return data;
  };
  const getAllInOneCall = async (details) => {
    let { city, latitude, longitude } = details;
    const base = "https://api.openweathermap.org/data/2.5/onecall";
    const key = "05e47cb6f8fc8afa437fc32af1218b36";
    const query = `?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&appid=${key}&units=metric`;
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(base + query);
    setLocationDetails(data);

    setLoading(false);
  };

  useEffect(() => {
    getClientDetails()
      .then((data) => {
        setDetails(data);
        getAllInOneCall(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("before if", loading);
  if (loading) return <div>Loading...</div>;
  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <main>
        <WeatherCard
          city={details.city.toLowerCase()}
          unit={unit}
        ></WeatherCard>
        <div className="btn-container">
          <button
            className={`tab-btn ${selectedTab == 0 && "active-btn"}`}
            onClick={() => handleChange(0)}
          >
            Daily
          </button>
          <button
            className={`tab-btn ${selectedTab == 1 && "active-btn"}`}
            onClick={() => handleChange(1)}
          >
            Hourly
          </button>
          <button
            className={`tab-btn ${selectedTab == 2 && "active-btn"}`}
            onClick={() => handleChange(2)}
          >
            Minutely
          </button>
        </div>
        <div className="main-container">
          {selectedTab === 0 && <Daily details={locationDetails} />}
          {selectedTab === 1 && <Hourly details={locationDetails.hourly} />}
          {selectedTab === 2 && <h4>Place Holder</h4>}
          <Map latitude={details.latitude} longitude={details.longitude} />
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
        url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=05e47cb6f8fc8afa437fc32af1218b36`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=05e47cb6f8fc8afa437fc32af1218b36`}
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default App;
