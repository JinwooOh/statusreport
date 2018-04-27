import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
//import NotFound from "./NotFound";
const baseUrl = process.env.PUBLIC_URL;
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path={baseUrl + "/"} component={App} />

      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);
export default Router;
