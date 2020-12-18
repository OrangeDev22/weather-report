import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import WeatherCard from "../../components/weathercard";
import Daily from "../../components/daily/Daily";
import Hourly from "../../components/hourly/Hourly";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchLocation, fetchAllInOneCall } from "../../useFetch";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const Home = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [locationDetails, setLocationDetails] = useState([]);
  const [currentDetails, setCurrent] = useState([]);
  const key = "05e47cb6f8fc8afa437fc32af1218b36";

  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";

  const unit = "celcius";
  const getClientDetails = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setDetails(data);
    return data;
  };

  useEffect(() => {
    getClientDetails()
      .then((data) => {
        setDetails(data);
        fetchLocation(data.city, data.country_code, key)
          .then((data) => {
            setCurrent(data);
          })
          .catch((err) => console.log(err));
        fetchAllInOneCall(key, data.latitude, data.longitude)
          .then((data) => {
            setLocationDetails(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <NavBar city={details.city} temp={locationDetails.current.temp} />
      <main>
        <WeatherCard
          city={details.city}
          unit={unit}
          dt={locationDetails.current.dt}
          timezone_offset={locationDetails.timezone_offset}
          details={currentDetails}
          country={details.country_name}
        ></WeatherCard>
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
          <button
            className={`tab-btn ${selectedTab === 2 && "active-btn"}`}
            onClick={() => handleChange(2)}
          >
            Minutely
          </button>
        </div>
        <div className="main-container">
          {selectedTab === 0 && (
            <Daily details={locationDetails} location={details.city} />
          )}
          {selectedTab === 1 && (
            <Hourly
              details={locationDetails.hourly}
              timezone_offset={locationDetails.timezone_offset}
            />
          )}
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

export default Home;
