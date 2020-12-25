import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { fetchLocation, fetchAllInOneCall } from "../../useFetch";
import Main from "../../components/main";

const Home = ({ screenWidth, unit, setUnit }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [locationDetails, setLocationDetails] = useState([]);
  const [currentDetails, setCurrent] = useState([]);
  const key = "05e47cb6f8fc8afa437fc32af1218b36";

  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";

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
