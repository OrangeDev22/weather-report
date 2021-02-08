import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { fetchLocationByCoords, fetchAllInOneCall } from "../useFetch";
import Main from "../components/main";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import { getName } from "country-list";
import { useApp } from "../contexts/AppProvider";

const API_KEY = process.env.REACT_APP_OW_RAWG_API_KEY;

const Home = () => {
  const history = useHistory();
  const { fetching } = useApp();
  const [locationName, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [permission, setPermission] = useState("");
  const [locationDetails, setLocationDetails] = useState([]);
  const [currentDetails, setCurrent] = useState([]);
  const location = navigator.geolocation;

  useEffect(() => {
    location.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setPermission("granted");
      },
      () => {
        setPermission("denied");
      }
    );
  }, [location, permission]);

  useEffect(() => {
    if (permission === "granted") {
      fetchLocationByCoords(latitude, longitude, API_KEY).then((response) => {
        const countryCode = response.sys.country ? response.sys.country : "";
        setCountry(getName(countryCode));
        setLocation(response.name);
        setCurrent(response);
        fetchAllInOneCall(API_KEY, latitude, longitude)
          .then((data) => {
            setLocationDetails(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      });
    } else if (permission === "denied") {
      history.push("/location/London/GB/51.50853/-0.12574");
    }
  }, [permission]);

  if (loading || fetching) return <Loading />;

  return (
    <Main
      location={locationName}
      locationDetails={locationDetails}
      currentDetails={currentDetails}
      countryName={country}
    />
  );
};

export default Home;
