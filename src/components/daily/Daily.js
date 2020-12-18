import React, { useState, useReducer, useEffect } from "react";
import { iconKey } from "../weathercard";
import { BiChevronsUp } from "react-icons/bi";
import "../../css/Daily.css";
import "leaflet/dist/leaflet.css";
const Daily = ({ details, location }) => {
  const defaultState = {
    daily: [],
  };
  const reducer = (state, action) => {
    if (action.type === "SETSTATE") {
      return { daily: details.daily };
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "SETSTATE" });
  }, []);

  let DailyList = () => {
    return state.daily.map((element, index) => {
      return (
        <DayItem
          element={element}
          key={location + "" + index + new Date().getTime().toString()}
        />
      );
    });
  };

  return (
    <>
      <div className="daily-card">
        <div className={`daily-card_header`}>
          <h1>7 days forecast</h1>
        </div>
        {DailyList()}
      </div>
    </>
  );
};
let DayItem = (props) => {
  let { temp, weather, dt } = props.element;
  const [showDetails, setShowDetails] = useState(false);
  let { max, min } = temp;
  let { description } = weather[0];
  let date = new Date(dt * 1000);
  let strDate = date.toString().slice(0, 7).split(" ");
  let day = strDate[0];
  let dayNumber = date.getUTCDate();
  let month = strDate[1];
  return (
    <>
      <section
        className={`daily-card_details ${description.replace(" ", "_")}`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="daily-card_details-header">
          <div className="daily-card_date_wrapper">
            <span>
              {day} {dayNumber < 10 ? "0" + dayNumber : dayNumber} , {month}
            </span>
          </div>
          <i
            className={`wu wu-${iconKey(description)} wu-64 wu-solid-white`}
          ></i>
          <div className="daily-card_temperatures">
            <p>{Math.round(max)}°C</p>
            <p>/ {Math.round(min)}°C</p>
          </div>
          <div className="description_wrapper">
            <p>
              {description.split(" ")[0]} <br />{" "}
              {description.split(" ")[1] !== null
                ? description.split(" ")[1]
                : ""}
            </p>
          </div>
          <h3 className={`arrow-icon ${showDetails ? "rotate-180" : ""}`}>
            <BiChevronsUp size={32} />
          </h3>
        </div>
        <DayDetails element={props.element} showDetails={showDetails} />
      </section>
    </>
  );
};
let DayDetails = ({ element, showDetails }) => {
  let { sunrise, sunset, temp, humidity, pressure, wind_speed } = element;
  let { night, eve, morn } = temp;
  let sunriseDate = new Date(sunrise * 1000),
    sunriseHour = sunriseDate.getHours(),
    sunriseMinutes = sunriseDate.getMinutes();
  let sunsetDate = new Date(sunset * 1000),
    sunsetHour = sunsetDate.getHours(),
    sunsetMinutes = sunsetDate.getMinutes();
  return (
    <div
      className={`daily-card_details-item-contet ${
        showDetails ? "show-details" : ""
      }`}
    >
      <div className="panel left">
        <p>
          Sunrise:{" "}
          <span>
            {sunriseHour}:
            {sunriseMinutes < 10 ? "0" + sunriseMinutes : sunriseMinutes} am
          </span>
        </p>
        <p>
          Sunset:{" "}
          <span>
            {sunsetHour}:
            {sunsetMinutes < 10 ? "0" + sunsetMinutes : sunsetMinutes} am
          </span>
        </p>
        <p>
          Humidity <span>{humidity}%</span>
        </p>
        <p>
          Wind speed <span>{wind_speed}</span>
        </p>
      </div>
      <div className="panel">
        <p>
          Morning: <span>{morn}°C</span>
        </p>
        <p>
          Evening: <span>{eve}°C</span>
        </p>
        <p>
          night: <span>{night}°C</span>
        </p>
        <p>
          Presure: <span>{pressure} hPa</span>
        </p>
      </div>
    </div>
  );
};
export default Daily;
