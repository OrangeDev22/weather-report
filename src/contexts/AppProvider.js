import React, { useState, useContext, createContext, useEffect } from "react";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [unit, setUnit] = useState("celsius");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const checkWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const ConvertTemperature = (temperature, unit) => {
    return unit === "celsius" ? temperature : (9 * temperature) / 5 + 32;
  };

  const iconKey = (element) => {
    switch (element) {
      case "clear":
        return "clear";
      case "few clouds":
        return "mostlycloudy";
      case "scattered clouds":
        return "partlycloudy";
      case "broken clouds":
        return "cloudy";
      case "overcast clouds":
        return "cloudy";
      case "rain":
        return "rain";
      case "drizzle":
        return "flurries";
      case "thunderstorm":
        return "tstorms";
      case "snow":
        return "snow";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squal":
      case "tornado":
        return "fog";
      default:
        return "unknown";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  });

  const value = {
    unit,
    setUnit,
    iconKey,
    screenWidth,
    ConvertTemperature,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
