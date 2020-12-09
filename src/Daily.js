import React, { Component, useState } from "react";
import { useFetch } from "./useFetch";
import { iconKey } from "./WeatherCard";
const Daily = ({ city, latitude, longitude }) => {
  const base = "https://api.openweathermap.org/data/2.5/onecall";
  const key = "05e47cb6f8fc8afa437fc32af1218b36";
  const query = `?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;
  console.log("url", base + query);
  const { loading, details } = useFetch(base + query);
  let { daily } = details;
  console.log(details);

  let getDailyList = () => {
    return daily.map(({ temp, dt, weather }) => {
      let { max, min } = temp;
      let { description } = weather[0];
      let date = new Date(dt * 1000);
      let strDate = date.toString().slice(0, 7).split(" ");
      let day = strDate[0];
      let dayNumber = date.getUTCDate();
      let month = strDate[1];
      console.log("description", description);
      return (
        <section
          key={dt}
          className={`daily-card_details ${description.replace(" ", "_")}`}
        >
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
          <button className="btn">more</button>
        </section>
      );
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
        {getDailyList()}
      </div>
    </>
  );
};

export default Daily;
