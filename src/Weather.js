import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
const Weather = () => {
  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";
  const { loading, details } = useFetch(url);
  console.log(details);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Weather at {details.city}</h1>
      <p>Country: {details.country_name}</p>
      <p>ip: {details.ip}</p>
      <img src={details.location.country_flag} alt="country flag" />
    </>
  );
};

export default Weather;
