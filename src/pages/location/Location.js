import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchLocation, fetchAllInOneCall } from "../../useFetch";
import "leaflet/dist/leaflet.css";
import countryList from "../../components/navbar/country_list.json";
import { useHistory } from "react-router-dom";
import Main from "../../components/main";
const API_KEY = process.env.REACT_APP_OW_RAWG_API_KEY;

const Location = ({ screenWidth, unit, setUnit }) => {
  const history = useHistory();
  const { location, latitude, longitude, countryCode } = useParams();
  const [currentDetails, setCurrent] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState("");

  const oneCall = (latitude, longitude) => {
    fetchAllInOneCall(API_KEY, latitude, longitude)
      .then((data) => {
        setLocationDetails(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoading(true);
    if (
      location != null &&
      latitude != null &&
      longitude != null &&
      countryCode != null
    ) {
      setCountryName(
        countryList.find((country) => {
          return country.country_code === countryCode;
        }).name
      );
      fetchLocation(location, countryCode, API_KEY)
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
    } else {
      history.push("/*");
    }
  }, [location, countryCode]);
  if (loading) return <h4>Loading...</h4>;

  return (
    <Main
      screenWidth={screenWidth}
      unit={unit}
      setUnit={setUnit}
      location={location}
      locationDetails={locationDetails}
      currentDetails={currentDetails}
      countryName={countryName}
    />
  );
};

export default Location;
