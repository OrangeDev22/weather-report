import React, { useState, useEffect, useRef } from "react";
import "../../css/NavBar.css";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useApp } from "../../contexts/AppProvider";

const NavBar = ({ city, temp }) => {
  const history = useHistory();
  const {
    unit,
    setUnit,
    screenWidth,
    ConvertTemperature,
    citiesList,
  } = useApp();
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const searchCity = (search, lat, lng, countryCode) => {
    let baseRoute = "";
    let optionalRoute = "";
    if (lat !== null && lng !== null) {
      baseRoute = `/location/${search}`;
      optionalRoute = `/${countryCode}/${lat}/${lng}`;
      history.push(baseRoute + optionalRoute);
    } else {
      let result = citiesList.find((city) => {
        return city.name.toLowerCase() === search ? city : null;
      });
      if (result != null) {
        baseRoute = `/location/${result.name}`;
        optionalRoute = `/${result.country}/${result.lat}/${result.lng}`;
        history.push(baseRoute + optionalRoute);
      } else {
        console.error("city was not found");
      }
    }
  };
  const keyPressedHandler = (e) => {
    if (e.key === "Enter") {
      searchCity(search, null, null, null);
    }
  };

  const setCity = (value) => {
    searchCity(value.name, value.lat, value.lng, value.country);
  };

  const changeTemperatureUnit = () => {
    if (unit === "celsius") setUnit("fahrenheit");
    else setUnit("celsius");
  };

  const onChangeHandler = (value) => {
    setSearch(value);
    setCitySearch(value.toLowerCase());
    value.length > 3 ? setDisplay(true) : setDisplay(false);
  };

  return (
    <nav className="nav-bar">
      {screenWidth < 600 || (
        <div className="nav-bar-main-container">
          <div className="title-wrapper">
            <h4>{city}</h4>
            <h4>{`${Math.round(ConvertTemperature(temp, unit))} ${
              unit === "celsius" ? "°C" : "°F"
            }`}</h4>
          </div>
        </div>
      )}
      <div className="nav-bar-main-wrapper">
        <div className="units-wrapper" onClick={() => changeTemperatureUnit()}>
          <span
            className={`temperature-unit ${
              unit === "celsius" ? "unit-selected" : ""
            }`}
          >
            C°
          </span>
          <span> | </span>
          <span
            className={`temperature-unit ${
              unit === "fahrenheit" ? "unit-selected" : ""
            }`}
          >
            {" "}
            F°
          </span>
        </div>
        <div className="input-container" ref={wrapperRef}>
          <div className="input-wrapper">
            {screenWidth < 600 && (
              <div className="icon-container">
                <BsSearch />
              </div>
            )}
            <input
              ref={inputRef}
              className="input-search"
              type="submmit"
              placeholder="type a locaiton name"
              onKeyPress={keyPressedHandler}
              onChange={(e) => onChangeHandler(e.target.value)}
              value={search}
              autoComplete="off"
            />
          </div>
          {display && (
            <div className="autoContainer">
              {citiesList &&
                citiesList
                  .filter(
                    ({ name }) => name.toLowerCase().indexOf(citySearch) > -1
                  )
                  .slice(0, 20)
                  .map((value, index) => {
                    return (
                      <div
                        onClick={() => {
                          setCity(value);
                        }}
                        className={`option ${value.name}`}
                        key={index}
                      >
                        <span>
                          {value.name} , {value.country}
                        </span>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
