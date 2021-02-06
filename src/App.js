import React from "react";
import Home from "./pages/Home";
import Location from "./pages/location";
import Error from "./pages/error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "./contexts/AppProvider";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <>
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/location/:location/:countryCode?/:latitude?/:longitude?"
              children={<Location />}
            ></Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
