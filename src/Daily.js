import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { iconKey } from "./WeatherCard";
const Daily = ({ city, latitude, longitude }) => {
  const [show, setShow] = useState(true);
  const [position, setPosition] = useState(0);
  const base = "https://api.openweathermap.org/data/2.5/onecall";
  const key = "05e47cb6f8fc8afa437fc32af1218b36";
  const query = `?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;
  const { loading, details } = useFetch(base + query);
  let { daily } = details;
  let toggleComponent = (index) => {
    setShow(!show);
    setPosition(index);
  };
  let DailyList = () => {
    return daily.map((element, index) => {
      //{ dt, description, day, dayNumber, month, max, min }
      return <DayItem element={element} key={index} />;
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
            <p>{Math.round(max)}</p>
            <p>/ {Math.round(min)}</p>
          </div>
          <div className="description_wrapper">
            <p>
              {description.split(" ")[0]} <br />{" "}
              {description.split(" ")[1] !== null
                ? description.split(" ")[1]
                : ""}
            </p>
          </div>
          <button className="btn" onClick={() => setShowDetails(!showDetails)}>
            more
          </button>
        </div>
        {showDetails && <DayDetails element={props.element} />}
      </section>
    </>
  );
};
let DayDetails = ({ element }) => {
  <div className="daily-card_details-header-item-contet">
    <div className="panel left">
      <p>
        heeey baby
        <span>watch out</span>
      </p>
    </div>
    <div className="panel">
      <h1>I im watching tv</h1>
    </div>
  </div>;
  console.log("element", element);
  let { sunrise, sunset, temp, humidity, pressure, wind_speed } = element;
  let sunriseDate = new Date(sunrise * 1000),
    sunriseHour = sunriseDate.getHours(),
    sunriseMinutes = sunriseDate.getMinutes();
  let sunsetDate = new Date(sunset * 1000),
    sunsetHour = sunsetDate.getHours(),
    sunsetMinutes = sunsetDate.getMinutes();
  return (
    <div className="daily-card_details-header-item-contet">
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
      </div>
      <div className="panel">
        <h1>I im watching tv</h1>
      </div>
    </div>
  );

  //description daynumber, month, max, min
};
export default Daily;
