import React from "react";
import { useApp } from "../../contexts/AppProvider";

function DayDetails({ element, showDetails }) {
  const { unit, ConvertTemperature } = useApp();
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
}

export default DayDetails;
