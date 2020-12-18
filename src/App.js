import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Location from "./pages/location";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/location/:location/:countryCode?/:latitude?/:longitude?"
            children={<Location />}
          ></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
