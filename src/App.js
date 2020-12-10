import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import WeatherCard from "./WeatherCard";
import Daily from "./Daily";
const App = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =
    "http://api.ipstack.com/check?access_key=d4d7e15716eb60585620301f3408eaa5&format=1";
  //const { loading, details } = useFetch(url);

  const [locationDetails, setLocationDetails] = useState([]);
  const unit = "celcius";
  const getClientDetails = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setDetails(data);
    return data;
  };
  const getAllInOneCall = async (details) => {
    console.log("data", details);
    let { city, latitude, longitude } = details;
    const base = "https://api.openweathermap.org/data/2.5/onecall";
    const key = "05e47cb6f8fc8afa437fc32af1218b36";
    const query = `?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;
    const response = await fetch(base + query);
    const data = await response.json();
    setLocationDetails(data);

    setLoading(false);
  };

  useEffect(() => {
    getClientDetails()
      .then((data) => {
        setDetails(data);
        getAllInOneCall(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("before if", loading);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <main>
        <WeatherCard
          city={details.city.toLowerCase()}
          unit={unit}
        ></WeatherCard>
        <Daily details={locationDetails}></Daily>
      </main>
    </>
  );
};

export default App;
