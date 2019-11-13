import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/page/Login";
import Profile from "./components/page/Profile";
import SearchResult from "./components/page/SearchResult";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth from "./modules/Auth";
import NavBar from "./components/child/NavBar";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const GlobalRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <GlobalRoute exact path="/" component={SearchResult} />
            <GlobalRoute path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
