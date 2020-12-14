import React from "react";
import "./css/NavBar.css";
const NavBar = ({ city, region_name, temp }) => {
  const searchCity = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
    } else {
      console.log("enter no pressed");
    }
  };
  return (
    <nav className="nav-bar">
      <div className="title-wrapper">
        <h4>
          {city}, {region_name}
        </h4>
        <h4>{Math.round(temp)}°C</h4>
      </div>
      <div className="input-wrapper">
        <input
          type="submmit"
          placeholder="Search city"
          onKeyPress={searchCity}
        />
      </div>
    </nav>
  );
};

export default NavBar;
