import React, { useState, useReducer, useEffect } from "react";
import { iconKey } from "../weathercard";
import { BiChevronsUp } from "react-icons/bi";
import "../../css/Daily.css";
import "leaflet/dist/leaflet.css";
import { ConvertTemperature } from "../../utils/tempUtils";

const Daily = ({ details, location, screenWidth, unit }) => {
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
          unit={unit}
          key={location + "" + index + new Date().getTime().toString()}
          screenWidth={screenWidth}
        />
      );
    });
  };

  return (
    <>
      <div className="daily-card">
        <div className={`daily-card_header`}>
          <h1>8 days forecast</h1>
        </div>
        {DailyList()}
      </div>
    </>
  );
};
let DayItem = (props) => {
  let { temp, weather, dt } = props.element;
  const unit = props.unit;
  const [showDetails, setShowDetails] = useState(false);
  let { max, min } = temp;
  let { main, description } = weather[0];
  let date = new Date(dt * 1000);
  let strDate = date.toString().slice(0, 7).split(" ");
  let day = strDate[0];
  let dayNumber = date.getUTCDate();
  let month = date.getUTCMonth();
  const descriptionHandler = (description) => {
    let str = "";
    if (description[1] != null) {
      str = description[1];
      if (description[2] != null) {
        str = str + " " + description[2];
      }
    }
    return str;
  };
  return (
    <>
      <section
        className={`daily-card_details ${main.toLowerCase()}`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="daily-card_details-header">
          <div className="daily-card_date_wrapper">
            <span>{day}.</span>
            <span>
              {dayNumber < 10 ? "0" + dayNumber : dayNumber}/{month + 1}
            </span>
          </div>
          <i
            className={`wu wu-${
              main === "Clouds"
                ? iconKey(description)
                : iconKey(main.toLowerCase())
            }  wu-${props.screenWidth < 600 ? 32 : 64} wu-solid-white`}
          ></i>
          <div className="daily-card_temperatures">
            <span>{`${Math.round(ConvertTemperature(max, unit))}`}</span>
            <span>
              /
              {`${Math.round(ConvertTemperature(min, unit))} ${
                unit === "celsius" ? "°C" : "°F"
              }`}
            </span>
          </div>
          <div className="description_wrapper">
            <p>
              {description.split(" ")[0]} <br />{" "}
              {descriptionHandler(description.split(" "))}
            </p>
          </div>
          <h3 className={`arrow-icon ${showDetails ? "rotate-180" : ""}`}>
            <BiChevronsUp size={props.screenWidth < 600 ? 16 : 32} />
          </h3>
        </div>
        <DayDetails
          element={props.element}
          showDetails={showDetails}
          unit={unit}
        />
      </section>
    </>
  );
};
let DayDetails = ({ element, showDetails, unit }) => {
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
      className={`daily-card_details-item-content ${
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
          Morning:{" "}
          <span>{`${Math.round(ConvertTemperature(morn, unit))}${
            unit === "celsius" ? "°C" : "°F"
          }`}</span>
        </p>
        <p>
          Evening:{" "}
          <span>{`${Math.round(ConvertTemperature(eve, unit))}${
            unit === "celsius" ? "°C" : "°F"
          }`}</span>
        </p>
        <p>
          night:{" "}
          <span>{`${Math.round(ConvertTemperature(night, unit))}${
            unit === "celsius" ? "°C" : "°F"
          }`}</span>
        </p>
        <p>
          Presure: <span>{pressure} hPa</span>
        </p>
      </div>
    </div>
  );
};
export default Daily;
