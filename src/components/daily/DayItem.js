import React, { useState } from "react";
import { useApp } from "../../contexts/AppProvider";
import { BiChevronsUp } from "react-icons/bi";
import DayDetails from "./DayDetails";

function DayItem(props) {
  const { unit, iconKey, ConvertTemperature } = useApp();
  const { temp, weather, dt } = props.element;
  const [showDetails, setShowDetails] = useState(false);
  const { max, min } = temp;
  const { main, description } = weather[0];
  const date = new Date(dt * 1000);
  const strDate = date.toString().slice(0, 7).split(" ");
  const day = strDate[0];
  const dayNumber = date.getUTCDate();
  const month = date.getUTCMonth();
  const descriptionHandler = (description) => {
    let str = "";
    if (description[1] != null) {
      str = description[1];
      if (description[2] != null) {
        str = str + " " + description[2];
      }
    }
    return str;
  };
  return (
    <>
      <section
        className={`daily-card_details ${main.toLowerCase()}`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="daily-card_details-header">
          <div className="daily-card_date_wrapper">
            <span>{day}.</span>
            <span>
              {dayNumber < 10 ? "0" + dayNumber : dayNumber}/{month + 1}
            </span>
          </div>
          <i
            className={`wu wu-${
              main === "Clouds"
                ? iconKey(description)
                : iconKey(main.toLowerCase())
            }  wu-${props.screenWidth < 600 ? 32 : 64} wu-solid-white`}
          ></i>
          <div className="daily-card_temperatures">
            <span>{`${Math.round(ConvertTemperature(max, unit))}`}</span>
            <span>
              /
              {`${Math.round(ConvertTemperature(min, unit))} ${
                unit === "celsius" ? "°C" : "°F"
              }`}
            </span>
          </div>
          <div className="description_wrapper">
            <p>
              {description.split(" ")[0]} <br />{" "}
              {descriptionHandler(description.split(" "))}
            </p>
          </div>
          <h3 className={`arrow-icon ${showDetails ? "rotate-180" : ""}`}>
            <BiChevronsUp size={props.screenWidth < 600 ? 16 : 32} />
          </h3>
        </div>
        <DayDetails
          element={props.element}
          showDetails={showDetails}
          unit={unit}
        />
      </section>
    </>
  );
}

export default DayItem;
