import React, { useEffect, useState } from "react";
import Chart from "../chart";
import { iconKey } from "../weathercard";
import { BiChevronsUp } from "react-icons/bi";
import "../../css/Hour.css";
const Hourly = ({ details, timezone_offset }) => {
  const [hours, setHours] = useState([]);

  let createHourlyItems = () => {
    return details.slice(0, 24).map((element) => {
      let {
        dt,
        temp,
        feels_like,
        pressure,
        humidity,
        visibility,
        wind_speed,
        dew_point,
        weather,
      } = element;
      let time = dt + timezone_offset;
      return (
        <HourlyItem
          dt={time}
          temp={temp}
          feels_like={feels_like}
          pressure={pressure}
          humidity={humidity}
          visibility={visibility}
          wind_speed={wind_speed}
          dew_point={dew_point}
          weather={weather}
        />
      );
    });
  };

  useEffect(() => {
    setHours(
      details.slice(0, 24).map((element, index) => {
        let time = element.dt + timezone_offset;
        let date = new Date(time * 1000);
        let hour = date.getUTCHours();

        return {
          name: `${
            index === 0 ? "" : `${hour < 11 ? `0${hour} am` : `${hour} pm`}`
          }`,
          hour: hour,
          temp: element.temp,
          label: `${Math.round(element.temp)}`,
        };
      })
    );
  }, []);

  return (
    <>
      <h1>Hourly forecast</h1>
      <Chart data={hours} timezone_offset={timezone_offset} />
      {createHourlyItems()}
    </>
  );
};
let HourlyItem = ({
  dt,
  temp,
  feels_like,
  pressure,
  humidity,
  visibility,
  wind_speed,
  dew_point,
  weather,
}) => {
  let [showDetails, setShowDetails] = useState(false);
  let date = new Date(dt * 1000);
  let strDate = date.toString().slice(0, 7).split(" ");
  let day = strDate[0];
  let dayNumber = date.getUTCDate();
  let { description } = weather[0];
  let hour = date.getUTCHours();
  return (
    <>
      <div
        className={`hourly-card-container ${description.replace(" ", "_")}`}
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        <div className="hourly-card-header">
          <div className="hourly-card-date-wrapper">
            <span>
              {hour < 10 ? "0" + hour : hour} {hour < 12 ? "am" : "pm"} {day}{" "}
              {dayNumber < 10 ? "0" + dayNumber : dayNumber}
            </span>
          </div>
          <span>
            {Math.round(temp) < 10 ? "0" + Math.round(temp) : Math.round(temp)}
            °C
          </span>
          <i
            className={`wu wu-${iconKey(description)} wu-64 wu-solid-white`}
          ></i>
          <div className="hourly-card-description-wrapper">
            <span>
              {description.split(" ")[0]}
              <br />
              {description.split(" ")[1]}{" "}
            </span>
          </div>
          <h3 className={`arrow-icon ${showDetails ? "rotate-180" : ""}`}>
            <BiChevronsUp size={32} />
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
};

const HourDetail = ({
  feels_like,
  pressure,
  humidity,
  visibility,
  wind_speed,
  dew_point,
  showDetails,
}) => {
  return (
    <div
      className={`hourly-card-details-item-content ${
        showDetails ? "hourly-show-details" : ""
      }`}
    >
      <div className="panel left">
        <p>
          Feels like: <span>{feels_like} °C</span>
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
          Dew point: <span>{dew_point} °C</span>
        </p>
      </div>
    </div>
  );
};

export default Hourly;
