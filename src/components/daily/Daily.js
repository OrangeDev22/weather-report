import React, { useReducer, useEffect } from "react";
import "../../css/Daily.css";
import "leaflet/dist/leaflet.css";
import DayItem from "./DayItem";
import { useApp } from "../../contexts/AppProvider";

const Daily = ({ details, location }) => {
  const { unit, screenWidth } = useApp();
  const defaultState = {
    daily: [],
  };
  const reducer = (state, action) => {
    if (action.type === "SETSTATE") {
      return { daily: details.daily };
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "SETSTATE" });
  }, []);

  const DailyList = () => {
    return state.daily.map((element, index) => {
      return (
        <DayItem
          element={element}
          unit={unit}
          key={location + "" + index + new Date().getTime().toString()}
          screenWidth={screenWidth}
        />
      );
    });
  };

  return (
    <>
      <div className="daily-card">
        <div className={`daily-card_header`}>
          <h1>8 days forecast</h1>
        </div>
        {DailyList()}
      </div>
    </>
  );
};

export default Daily;
