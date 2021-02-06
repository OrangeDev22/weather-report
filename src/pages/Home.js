import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { fetchLocation, fetchAllInOneCall } from "../useFetch";
import Main from "../components/main";

const API_KEY = process.env.REACT_APP_OW_RAWG_API_KEY;
const IP_API_KEY = process.env.REACT_APP_IP_RAW_API_KEY;

const Home = ({ screenWidth, unit, setUnit }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationDetails, setLocationDetails] = useState([]);
  const [currentDetails, setCurrent] = useState([]);

  const url = `http://api.ipstack.com/check?access_key=${IP_API_KEY}&format=1`;

  // const unit = "celcius";
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
        fetchLocation(data.city, data.country_code, API_KEY)
          .then((data) => {
            setCurrent(data);
          })
          .catch((err) => console.log(err));
        fetchAllInOneCall(API_KEY, data.latitude, data.longitude)
          .then((data) => {
            setLocationDetails(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Main
      screenWidth={screenWidth}
      unit={unit}
      setUnit={setUnit}
      location={details.city}
      locationDetails={locationDetails}
      currentDetails={currentDetails}
      countryName={details.country_name}
    />
  );
};

export default Home;
