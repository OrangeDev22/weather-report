import React, { useState, useEffect, useRef } from "react";
import "../../css/NavBar.css";
import cityList from "./city_list.json";
import { useHistory } from "react-router-dom";
const NavBar = ({ city, temp, screenWidth }) => {
  let history = useHistory();
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setOptions(
      cityList.map((element) => {
        return {
          id: element.id,
          name: element.name,
          state: element.state,
          country: element.country,
          lat: element.coord.lat,
          lon: element.coord.lon,
        };
      })
    );
  }, []);

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

  const searchCity = (search, lat, lon, countryCode) => {
    let baseRoute = "";
    let optionalRoute = "";
    if (lat !== null && lon !== null) {
      baseRoute = `/location/${search}`;
      optionalRoute = `/${countryCode}/${lat}/${lon}`;
      history.push(baseRoute + optionalRoute);
    } else {
      let result = cityList.find((city) => {
        return city.name === formatCityName(search) ? city : null;
      });
      if (result != null) {
        baseRoute = `/location/${result.name}`;
        optionalRoute = `/${result.country}/${result.coord.lat}/${result.coord.lon}`;
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
    searchCity(value.name, value.lat, value.lon, value.country);
  };
  const formatCityName = (value) => {
    return value
      .split(" ")
      .map((element) => {
        return element.replace(
          element.charAt(0),
          element.charAt(0).toUpperCase()
        );
      })
      .join(" ");
  };
  const onChangeHandler = (value) => {
    setSearch(value);
    let str = formatCityName(value);
    setCitySearch((old) => (old = str));
    value.length > 3 ? setDisplay(true) : setDisplay(false);
  };

  return (
    <nav className="nav-bar">
      {screenWidth < 600 || (
        <div className="title-wrapper">
          <h4>{city}</h4>
          <h4>{Math.round(temp)}°C</h4>
        </div>
      )}
      <div className="input-wrapper" ref={wrapperRef}>
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

        {display && (
          <div className="autoContainer">
            {options
              .filter(({ name }) => name.indexOf(citySearch) > -1)
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
    </nav>
  );
};

export default NavBar;
