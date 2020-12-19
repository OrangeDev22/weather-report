import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchLocation, fetchAllInOneCall } from "../../useFetch";
import NavBar from "../../components/navbar";
import WeatherCard from "../../components/weathercard";
import Daily from "../../components/daily/Daily";
import Hourly from "../../components/hourly/Hourly";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import countryList from "../../components/navbar/country_list.json";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const Location = ({ screenWidth }) => {
  const { location, latitude, longitude, countryCode } = useParams();
  const [currentDetails, setCurrent] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState("");
  const key = "05e47cb6f8fc8afa437fc32af1218b36";
  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };
  const oneCall = (latitude, longitude) => {
    fetchAllInOneCall(key, latitude, longitude)
      .then((data) => {
        setLocationDetails(data);
        setLoading(false);
        setSelectedTab(0);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoading(true);
    setCountryName(
      countryList.find((country) => {
        return country.country_code === countryCode;
      }).name
    );
    fetchLocation(location, countryCode, key)
      .then((data) => {
        setCurrent(data);
        if (latitude != null && longitude != null) {
          oneCall(latitude, longitude);
        } else {
          oneCall(data.coord.lat, data.coord.lon);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  if (loading) return <h4>Loading...</h4>;

  return (
    <>
      <NavBar city={location} temp={locationDetails.current.temp} />
      <main>
        <WeatherCard
          city={location}
          unit="celcius"
          dt={locationDetails.current.dt}
          details={currentDetails}
          timezone_offset={locationDetails.timezone_offset}
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
            />
          )}
          {selectedTab === 1 && (
            <Hourly
              details={locationDetails.hourly}
              timezone_offset={locationDetails.timezone_offset}
              screenWidth={screenWidth}
            />
          )}
          {/* <Map
            latitude={currentDetails.coord.lat}
            longitude={currentDetails.coord.lon}
          /> */}
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
export default Location;
