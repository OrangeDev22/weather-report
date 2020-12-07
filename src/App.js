import React, { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./useFetch";
import CurrentWeather from "./CurrentWeather";
const App = () => {
  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";
  const { loading, details } = useFetch(url);
  const unit = "celcius";

  console.log(details);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <CurrentWeather
        city={details.city.toLowerCase()}
        unit={unit}
      ></CurrentWeather>
      <img src={details.location.country_flag} alt="country flag" />
    </>
  );
};

export default App;
