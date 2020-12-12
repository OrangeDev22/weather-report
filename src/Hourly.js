import React, { useEffect, useState } from "react";
import Chart from "./Chart";
const Hourly = ({ details }) => {
  const [hours, setHours] = useState([]);
  useEffect(() => {
    setHours(
      details.slice(1, 22).map((element, index) => {
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
    </>
  );
};

export default Hourly;
