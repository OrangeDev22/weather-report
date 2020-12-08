import React, { Component, useState } from "react";
import { useFetch } from "./useFetch";

const CurrentWeather = ({ city, unit }) => {
  const key = "05e47cb6f8fc8afa437fc32af1218b36";
  const base = "http://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&units=metric&appid=${key}`;

  const { loading, details } = useFetch(base + query);

  const convertTemperature = (temperature) => {
    return unit === "celcius" ? temperature : (temperature * 9) / 5 - 459.67;
  };

  if (loading) return <h1>Loading...</h1>;

  const { main, weather, visibility, dt } = details;

  let { description } = weather[0];

  let weatherMainDescription = weather[0].main;

  const { temp, pressure, humidity } = main;

  let unix_timestamp = dt;
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let dayTime = () => {
    return hours < 17 ? "day" : "night";
  };
  let iconKey = () => {
    // description = "clear sky";
    // console.log(description);

    switch (description) {
      case "clear sky":
        return "clear";
      case "few clouds":
        return "mostlycloudy";
      case "scattered clouds":
        return "cloudy";
      case "broken clouds":
        return "partlycloudy";
      case "shower rain":
        return "flurries";
      case "rain":
        return "rain";
      case "thunderstorm":
        return "tstorms";
      case "snow":
        return "snow";
      case "mist":
        return "fog";
      default:
        return "unknown";
    }
  };
  description = "mist";
  return (
    <>
      <div className="weather-card">
        <div
          className={`weather-card_container ${description.replace(" ", "_")}`}
        >
          <div className="weather-card_panel">
            <h2>The weather now at {city}</h2>
            <p>
              {hours}:{minutes < 10 ? "0" + minutes : minutes}
            </p>
            <div className="weather-card_panel main">
              <i
                className={`wu wu-${iconKey()} wu-128 wu-solid-white wu-${dayTime()}`}
              ></i>
              <p className="temperature">
                {Math.round(convertTemperature(temp))}°{""}
                {unit === "celcius" ? "c" : "f"}
              </p>
            </div>
            <div className="description_container">
              <h4 className="weather_description">{weatherMainDescription}</h4>
              <p className="weather_description">{description}</p>
            </div>
          </div>
          <section className="weather-card_pard_panel details">
            <p className="details">Pressure: {pressure} hPa</p>
            <p className="details">Humidity: {humidity}%</p>
            <p className="details">visibility: {visibility / 1000} km</p>
            <button className="btn">Show more</button>
          </section>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;