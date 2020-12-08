import React, { Component, useState } from "react";
import { useFetch } from "./useFetch";
const Daily = ({ city }) => {
  const base = "https://api.openweathermap.org/data/2.5/forecast";
  const key = "05e47cb6f8fc8afa437fc32af1218b36";
  const query = `?q=${city}&units=metric&appid=${key}`;

  const { loading, details } = useFetch(base + query);
  let { list } = details;
  // console.log("DAILY DETAILS", list);
  let getDailyList = () => {
    console.log("list", list);
    list.map(({ main, dt }) => {
      console.log("days details", main);
    });
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>dasdasdasd {getDailyList()}</div>
    </>
  );
};

export default Daily;
