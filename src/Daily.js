import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "./useFetch";
import { iconKey } from "./WeatherCard";
import { BiChevronsUp } from "react-icons/bi";
import "./css/Daily.css";
const Daily = ({ details }) => {
  console.log("details in daily", details);
  const [show, setShow] = useState(true);
  const [position, setPosition] = useState(0);
  // const base = "https://api.openweathermap.org/data/2.5/onecall";
  // const key = "05e47cb6f8fc8afa437fc32af1218b36";
  // const query = `?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;
  // const { loading, details } = useFetch(base + query);
  let { daily } = details;
  // console.log(base + query);
  let DailyList = () => {
    return daily.map((element, index) => {
      //{ dt, description, day, dayNumber, month, max, min }
      return <DayItem element={element} key={index} />;
    });
  };

  return (
    <>
      <div className="daily-card">
        <div className={`daily-card_header`}>
          <h1>Daily report 7 days</h1>
        </div>
        {/* {show ? <DailyList /> : <DayDetails daily={daily} index={position} />} */}
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
        {/* {showDetails && (
          <DayDetails element={props.element} showDetails={showDetails} />
        )} */}
      </section>
    </>
  );
};
let DayDetails = ({ element, showDetails }) => {
  const panelReference = useRef(null);
  const itemContentReference = useRef(null);

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
      <div className="panel left" ref={panelReference}>
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
          Presure: <span>pressure</span>
        </p>
      </div>
    </div>
  );

  //description daynumber, month, max, min
};
export default Daily;
