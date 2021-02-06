import React, { useState } from "react";
import { BiChevronsUp } from "react-icons/bi";
import { useApp } from "../../contexts/AppProvider";
import HourDetail from "./HourDetail";

function HourlyItem({
  dt,
  temp,
  feels_like,
  pressure,
  humidity,
  visibility,
  wind_speed,
  dew_point,
  weather,
}) {
  const { unit, screenWidth, ConvertTemperature, iconKey } = useApp();
  const [showDetails, setShowDetails] = useState(false);
  const date = new Date(dt * 1000);
  const strDate = date.toString().slice(0, 7).split(" ");
  const day = strDate[0];
  const dayNumber = date.getUTCDate();
  const { description, main } = weather[0];
  const hour = date.getUTCHours();
  return (
    <>
      <div
        className={`hourly-card-container ${main.toLowerCase()}`}
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        <div className="hourly-card-header">
          <div className="hourly-card-date-wrapper">
            <span>
              {hour < 10 ? "0" + hour : hour} {hour < 12 ? "am" : "pm"}
            </span>
            <span>
              {day} {dayNumber < 10 ? "0" + dayNumber : dayNumber}
            </span>
          </div>
          <div className="hourly-card-header-temperature-wrapper">
            <span>
              {`${Math.round(ConvertTemperature(temp, unit))}${
                unit === "celsius" ? "°C" : "°F"
              }`}
            </span>
          </div>
          <i
            className={`wu wu-${
              main === "Clouds"
                ? iconKey(description)
                : iconKey(main.toLowerCase())
            } wu-${screenWidth < 600 ? "32" : "64"} wu-solid-white`}
          ></i>
          <div className="hourly-card-description-wrapper">
            <span>
              {description.split(" ")[0]}
              <br />
              {description.split(" ")[1]}{" "}
            </span>
          </div>
          <h3 className={`arrow-icon ${showDetails ? "rotate-180" : ""}`}>
            <BiChevronsUp size={screenWidth < 600 ? 16 : 32} />
          </h3>
        </div>

        <HourDetail
          feels_like={feels_like}
          pressure={pressure}
          humidity={humidity}
          visibility={visibility}
          wind_speed={wind_speed}
          dew_point={dew_point}
          showDetails={showDetails}
        />
      </div>
    </>
  );
}

export default HourlyItem;
