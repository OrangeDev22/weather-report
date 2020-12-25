import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Location from "./pages/location";
import Error from "./pages/error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const App = () => {
  const checkWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [unit, setUnit] = useState("celsius");
  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  });
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home screenWidth={screenWidth} unit={unit} setUnit={setUnit} />
          </Route>
          <Route
            path="/location/:location/:countryCode?/:latitude?/:longitude?"
            children={
              <Location
                screenWidth={screenWidth}
                unit={unit}
                setUnit={setUnit}
              />
            }
          ></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
