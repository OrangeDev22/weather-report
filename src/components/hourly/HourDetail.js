import React from "react";
import { useApp } from "../../contexts/AppProvider";

function HourDetail({
  feels_like,
  pressure,
  humidity,
  visibility,
  wind_speed,
  dew_point,
  showDetails,
}) {
  const { unit, ConvertTemperature } = useApp();

  return (
    <div
      className={`hourly-card-details-item-content ${
        showDetails ? "hourly-show-details" : ""
      }`}
    >
      <div className="panel left">
        <p>
          Feels like:{" "}
          <span>{`${Math.round(ConvertTemperature(feels_like, unit))}${
            unit === "celsius" ? "°C" : "°F"
          }`}</span>
        </p>
        <p>
          Pressure: <span>{pressure} hPa</span>
        </p>
        <p>
          humidity <span>{humidity} %</span>
        </p>
      </div>
      <div className="panel">
        <p>
          Visibility: <span>{visibility / 1000} km</span>
        </p>
        <p>
          Wind speed: <span>{wind_speed} km</span>
        </p>
        <p>
          Dew point:{" "}
          <span>{`${Math.round(ConvertTemperature(dew_point, unit))}${
            unit === "celsius" ? "°C" : "°F"
          }`}</span>
        </p>
      </div>
    </div>
  );
}

export default HourDetail;
