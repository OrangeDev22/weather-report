import React, { useEffect, useState } from "react";
import Chart from "../chart";
import HourlyItem from "./HourlyItem";
import "../../css/Hour.css";
import { useApp } from "../../contexts/AppProvider";

const Hourly = ({ details, timezone_offset }) => {
  const { unit, screenWidth, ConvertTemperature } = useApp();
  const [hours, setHours] = useState([]);
  const [displayChart, setDisplayChart] = useState(true);

  useEffect(() => {
    let newHours = [];
    details.slice(0, 24).forEach((element, index) => {
      const time = element.dt + timezone_offset;
      const date = new Date(time * 1000);
      const hour = date.getUTCHours();
      if (index % 2 !== 0) {
        let newHour = {
          name: `${
            index === 0
              ? ""
              : `${hour < 10 ? "0" + hour + ":00" : hour + ":00"}`
          }`,
          hour: hour,
          temp: ConvertTemperature(element.temp, unit),
          label: `${Math.round(ConvertTemperature(element.temp, unit))}`,
        };
        newHours = [...newHours, newHour];
      }
    });
    setHours(newHours);
  }, [unit]);

  useEffect(() => {
    screenWidth < 600 ? setDisplayChart(false) : setDisplayChart(true);
  }, [screenWidth]);

  return (
    <>
      <div className="hourly-header">
        <h1>Hourly forecast</h1>
      </div>
      {displayChart && (
        <div className="chart-container">
          <Chart
            data={hours}
            timezone_offset={timezone_offset}
            screenWidth={screenWidth}
          />
        </div>
      )}
      {details.slice(0, 24).map((element) => {
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
            key={dt}
          />
        );
      })}
    </>
  );
};

export default React.memo(Hourly);
