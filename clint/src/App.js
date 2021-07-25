import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const { default: Login } = require("./Components/Login/Login");
const { default: Profile } = require("./Components/profile/Profile");
const { default: Registration } = require("./Components/Register/Registration");
const { default: Update } = require("./Components/Update/Update");
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/Registration">
            <Registration />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/Update">
            <Update />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
