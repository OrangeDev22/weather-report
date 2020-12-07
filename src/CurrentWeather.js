import React, { Component } from "react";
import { useFetch } from "./useFetch";
const CurrentWeather = ({ city, unit }) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=05e47cb6f8fc8afa437fc32af1218b36`;
  const { loading, details } = useFetch(url);
  console.log("city", city);
  console.log("details", details);

  //T(°C) = T(K) - 273.15 = 26.85 °C
  //T(°F) = T(K) × 9/5 - 459.67
  const convertTemperature = (temperature) => {
    return unit === "celcius" ? temperature : (temperature * 9) / 5 - 459.67;
  };

  if (loading) return <h1>Loading...</h1>;
  const { main, weather, visibility, dt } = details;
  const { description } = weather[0];
  const { feels_like, pressure, humidity } = main;
  console.log("weather", weather);
  console.log("description", description);
  return (
    <>
      <div>
        <h2>The weather now at {city}: </h2>
        <h3>{description}</h3>
      </div>
      <h2>
        {Math.round(convertTemperature(feels_like))}°
        {unit === "celcius" ? "c" : "f"}
      </h2>
      <section>
        <p>Pressure: {pressure} mbar</p>
        <p>Humidity: {humidity}%</p>
        <p>visibility: {visibility / 1000} km</p>
      </section>
    </>
  );
};

export default CurrentWeather;
