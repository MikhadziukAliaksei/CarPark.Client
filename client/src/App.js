import withRoot from './withroot';
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/auth.service";

import Home from "./components/home.component";
import AppAppBar from "./views/AppAppBar";
import SignIn from './SignIn';
import SignUp from './SignUp';
import DCars from './components/DCars';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

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

    return (
      <div>
        <AppAppBar />
        <Provider store={store}>
          <ToastProvider autoDismiss={true}>
            <Container maxWidth="lg">
              <DCars />
            </Container>
          </ToastProvider>
        </Provider>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRoot(App);