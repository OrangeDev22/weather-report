import React, { useReducer, useEffect } from "react";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { ConvertTemperature } from "../../utils/tempUtils";
const WeatherCard = ({
  city,
  unit,
  dt,
  timezone_offset,
  details,
  country,
  screenWidth,
}) => {
  // const convertTemperature = (temperature) => {
  //   console.log("unit", unit);
  //   return unit === "celsius" ? temperature : (9 * temperature) / 5 + 32;
  // };
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getMonth = (month) => {
    return months[parseInt(month)];
  };
  const reducer = (state, action) => {
    let unix_timestamp = dt + timezone_offset;
    let time = new Date(unix_timestamp * 1000);
    if (action.type === "SET_WEATHER_CARD") {
      return {
        cityName: city,
        day: time.getUTCDate(),
        month: time.getUTCMonth(),
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
    return state.hour < 17 ? "day" : "night";
  };

  return (
    <>
      <div className="weather-card">
        <div
          className={`weather-card-wrapper ${weather[0].main.toLowerCase()}`}
        >
          <div className="weather-card-title">
            <p>
              {screenWidth < 600 ? "" : "Weather at"} {state.cityName}{" "}
              {screenWidth < 600 ? "" : state.country}
            </p>
            <div className="time-wrapper">
              <p>
                {`${getMonth(state.month)} `}
                {`${state.day} `}
                {state.hour < 12 ? "0" + state.hour : state.hour}:
                {state.minutes < 10 ? "0" + state.minutes : state.minutes}{" "}
              </p>
            </div>
          </div>
          <div className="weather-card-panel-wrapper">
            <div className="weather-card_panel">
              <div className="weather-card_panel main">
                <div
                  className={`wu wu-${
                    weather[0].main === "Clouds"
                      ? iconKey(state.description)
                      : iconKey(weather[0].main.toLowerCase())
                  } wu-${
                    screenWidth < 400 ? "64" : "128"
                  } wu-solid-white wu-${dayTime()}`}
                ></div>
                <p className="temperature">
                  {Math.round(ConvertTemperature(state.temp, unit))}°{""}
                  {unit === "celsius" ? "C" : "F"}
                </p>
              </div>
              <div className="details-container">
                <div className="detail-wrapper">
                  <WiBarometer size={22} />
                  <p>{state.pressure} hPa</p>
                </div>
                <div className="detail-wrapper">
                  <WiHumidity size={22} />
                  <p>{state.humidity}%</p>
                </div>
                <div className="detail-wrapper">
                  <MdVisibility size={22} />
                  <p>{state.visibility / 1000} km</p>
                </div>
              </div>
              <div className="description_container">
                {screenWidth < 600 || (
                  <h4 className="weather_description">
                    {state.mainDescription}
                  </h4>
                )}
                <p className="weather_description">{state.description}</p>
              </div>
            </div>
            {screenWidth < 600 || (
              <section className="weather-card_panel-right details">
                <p className="details">Pressure: {state.pressure} hPa</p>
                <p className="details">Humidity: {state.humidity}%</p>
                <p className="details">
                  visibility: {state.visibility / 1000} km
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export let iconKey = (element) => {
  switch (element) {
    case "clear":
      return "clear";
    case "few clouds":
      return "mostlycloudy";
    case "scattered clouds":
      return "partlycloudy";
    case "broken clouds":
      return "cloudy";
    case "overcast clouds":
      return "cloudy";
    case "rain":
      return "rain";
    case "drizzle":
      return "flurries";
    case "thunderstorm":
      return "tstorms";
    case "snow":
      return "snow";
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
    case "squal":
    case "tornado":
      return "fog";
    default:
      return "unknown";
  }
};
export default WeatherCard;
