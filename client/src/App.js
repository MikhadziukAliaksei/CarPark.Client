import withRoot from './withroot';
import React, { Component } from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";

import AuthService from "./services/auth.service";
import Home from "./views/Home";
import AppAppBar from "./views/AppAppBar";
import SignIn from './SignIn';
import SignUp from './SignUp';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <AppAppBar /> 
        <Router>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default withRoot(App);