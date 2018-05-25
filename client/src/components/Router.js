import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Report from "./Report";
import NotFound from "./NotFound";
//import NotFound from "./NotFound";
const baseUrl = process.env.PUBLIC_URL;
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={baseUrl + "/"} component={App} />
      <Route path={baseUrl + "/report"} component={Report} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
// basename="/all-status-reports"
export default Router;
