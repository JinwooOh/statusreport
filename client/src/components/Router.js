import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Report from './Report';
import NotFound from './NotFound';
import EditName from './EditName';
import EditSelect from './EditSelect';
import EditCourseInfo from './EditCourseInfo';
import EditUser from './EditUser';
import Login from './Login';

// import NotFound from "./NotFound";
const baseUrl = process.env.PUBLIC_URL;
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${baseUrl}/`} component={App} />
      <Route path={`${baseUrl}/editname`} component={EditName} />
      <Route path={`${baseUrl}/editcourseinfo`} component={EditCourseInfo} />
      <Route path={`${baseUrl}/editselect`} component={EditSelect} />
      <Route path={`${baseUrl}/edituser`} component={EditUser} />
      <Route path={`${baseUrl}/report`} component={Report} />
      <Route path={`${baseUrl}/login`} component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
// basename="/all-status-reports"
export default Router;
