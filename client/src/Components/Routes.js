import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth/Auth";
import Feed from "../Routes/Feed/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile/Profile";
import Search from "../Routes/Search/Search";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
