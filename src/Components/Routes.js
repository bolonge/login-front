import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Main from "../Routes/Main";
import SignUp from "../Routes/SignUp";
import Login from "../Routes/Login";

const LogIn = () => (
  <Switch>
    <Route exact path="/" component={Main} />
  </Switch>
);

const LogOut = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

const Routes = ({ check }) => (check ? <LogIn /> : <LogOut />);

Routes.propTypes = {
  check: PropTypes.bool.isRequired
};
export default Routes;
