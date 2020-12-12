import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { iconKey } from "./WeatherCard";
import { BiChevronsUp } from "react-icons/bi";
import "./css/Hour.css";
const Hourly = ({ details }) => {
  const [hours, setHours] = useState([]);
  console.log(details);
  useEffect(() => {
    setHours(
      details.slice(1, 24).map((element, index) => {
        let date = new Date(element.dt * 1000);
        let hour = date.getHours();
        let minutes = date.getMinutes();
        return {
          name: `${
            index === 0 ? "" : `${hour < 11 ? `0${hour} am` : `${hour} pm`}`
          }`,
          hour: hour,
          temp: Math.round(element.temp),
        };
      })
    );
  }, []);
  return (
    <>
      <Chart data={hours} />
      <HourlyItem details={details} />
    </>
  );
};
let HourlyItem = ({ details }) => {
  console.log("details in hourly item", details);
  let [showDetails, setShowDetails] = useState(false);
  let createHourlyItem = () => {
    return details.map((element) => {
      let {
        dt,
        temp,
        feels_like,
        pressure,
        humidity,
        visibility,
        wind_speed,
        weather,
      } = element;

      let date = new Date(dt * 1000);
      let strDate = date.toString().slice(0, 7).split(" ");
      let day = strDate[0];
      let dayNumber = date.getUTCDate();
      let { description } = weather[0];
      let hour = date.getHours();
      return (
        <div
          className={`hourly-card-container ${description.replace(" ", "_")}`}
        >
          <div className="hourly-card-header">
            <div className="hourly-card-date-wrapper">
              <span>
                {hour < 10 ? "0" + hour : hour} {hour < 12 ? "am" : "pm"} {day}{" "}
                {dayNumber < 10 ? "0" + dayNumber : dayNumber}
              </span>
            </div>
            <span>
              {Math.round(temp) < 10
                ? "0" + Math.round(temp)
                : Math.round(temp)}
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
        </div>
      );
    });
  };

  return <>{createHourlyItem()};</>;
};
export default Hourly;
