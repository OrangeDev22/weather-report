import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import WeatherCard from "./WeatherCard";
import Daily from "./Daily";
const App = () => {
  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";
  const { loading, details } = useFetch(url);
  const unit = "celcius";

  console.log(details);
  if (loading) return <div>Loading...</div>;
  let { city, latitude, longitude } = details;

  return (
    <>
      <main>
        <WeatherCard
          city={details.city.toLowerCase()}
          unit={unit}
        ></WeatherCard>
        <Daily city={city} latitude={latitude} longitude={longitude}></Daily>
      </main>
    </>
  );
};

export default App;
