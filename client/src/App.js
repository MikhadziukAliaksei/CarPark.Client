import withRoot from './withroot';
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AuthService from "./services/auth.service";

import Home from "./components/home.component";
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

  logOut() {//не понимаю зачем оно здесь
    AuthService.logout();
  }

  render() {

    return (
      <div>
        <AppAppBar isAuth={!!currentUser} />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            {/*вот здесь я не уверена по поводу роута,можно убрать и при логайте перенаправлять на главную прямо в коде
            я попробую,если не сработает вставить эту строчку:  <Route exact path="/logout" component={Home} />*/}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRoot(App);