import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchLocation, fetchAllInOneCall } from "../../useFetch";
import "leaflet/dist/leaflet.css";
import { useHistory } from "react-router-dom";
import Main from "../../components/main";
import Loading from "../../components/Loading";
import { getName } from "country-list";
import { useApp } from "../../contexts/AppProvider";

const API_KEY = process.env.REACT_APP_OW_RAWG_API_KEY;

const Location = () => {
  const history = useHistory();
  const { fetching } = useApp();
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
      .catch(() => history.push("/"));
  };
  useEffect(() => {
    setLoading(true);
    if (
      location != null &&
      latitude != null &&
      longitude != null &&
      countryCode != null
    ) {
      setCountryName(getName(countryCode));
      fetchLocation(location, countryCode, API_KEY)
        .then((data) => {
          setCurrent(data);
          if (latitude != null && longitude != null) {
            oneCall(latitude, longitude);
          } else {
            oneCall(data.coord.lat, data.coord.lon);
          }
        })
        .catch(() => {
          history.push("/");
        });
    } else {
      history.push("/*");
    }
  }, [location, countryCode]);
  if (loading || fetching) return <Loading />;

  return (
    <Main
      location={location}
      locationDetails={locationDetails}
      currentDetails={currentDetails}
      countryName={countryName}
    />
  );
};

export default Location;
