import React, { useReducer, useState, useEffect } from "react";

const WeatherCard = ({ city, unit, dt, timezone_offset, details, country }) => {
  const convertTemperature = (temperature) => {
    return unit === "celcius" ? temperature : (temperature * 9) / 5 - 459.67;
  };
  const defaultState = {
    cityName: "",
    date: "",
    hours: "",
    minutes: "",
    temp: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
    description: "",
    mainDescription: "",
    country: "",
  };
  const { main, weather } = details;

  const reducer = (state, action) => {
    let unix_timestamp = dt + timezone_offset;
    let time = new Date(unix_timestamp * 1000);
    if (action.type === "SET_WEATHER_CARD") {
      return {
        cityName: city,
        date: time,
        hour: time.getUTCHours(),
        minutes: time.getUTCMinutes(),
        temp: main.temp,
        pressure: main.pressure,
        humidity: main.humidity,
        visibility: details.visibility,
        description: weather[0].description,
        mainDescription: weather[0].main,
        country: country,
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "SET_WEATHER_CARD" });
  }, []);

  let dayTime = () => {
    return state.hours < 17 ? "day" : "night";
  };

  return (
    <>
      <div className="weather-card">
        <div
          className={`weather-card_container ${state.description.replace(
            " ",
            "_"
          )}`}
        >
          <div className="weather-card_panel">
            <h2>
              Weather at {state.cityName} - {state.country}
            </h2>
            <p>
              {state.hour}:
              {state.minutes < 10 ? "0" + state.minutes : state.minutes}
            </p>
            <div className="weather-card_panel main">
              <i
                className={`wu wu-${iconKey(
                  state.description
                )} wu-128 wu-solid-white wu-${dayTime()}`}
              ></i>
              <p className="temperature">
                {Math.round(convertTemperature(state.temp))}°{""}
                {unit === "celcius" ? "c" : "f"}
              </p>
            </div>
            <div className="description_container">
              <h4 className="weather_description">{state.mainDescription}</h4>
              <p className="weather_description">{state.description}</p>
            </div>
          </div>
          <section className="weather-card_pard_panel details">
            <p className="details">Pressure: {state.pressure} hPa</p>
            <p className="details">Humidity: {state.humidity}%</p>
            <p className="details">visibility: {state.visibility / 1000} km</p>
            <button className="btn">Show more</button>
          </section>
        </div>
      </div>
    </>
  );
};
export let iconKey = (element) => {
  switch (element) {
    case "clear sky":
      return "clear";
    case "few clouds":
      return "mostlycloudy";
    case "scattered clouds":
      return "partlycloudy";
    case "broken clouds":
      return "cloudy";
    case "overcast clouds":
      return "cloudy";
    case "shower rain":
      return "flurries";
    case "rain":
      return "rain";
    case "light rain":
      return "flurries";
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
export default WeatherCard;
