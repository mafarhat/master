import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Artists from "./artists"

const App = () => (
  <div layout="row" layout-align="start">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Artists} />
    </Switch>
  </div>
);
export default App;
