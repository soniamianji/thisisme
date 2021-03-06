import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/page/Login";
import Profile from "./components/page/Profile";
import SearchResult from "./components/page/SearchResult";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth from "./modules/Auth";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import NavBar from "./components/child/NavBar";
import JobHunt from "./components/page/JobHunt";
import SingleJob from "./components/page/SingleJob";
import IntroForm from "./components/page/IntroForm";

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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" >
          <ThemeProvider theme={theme}>
            <NavBar />
            <GlobalRoute exact path="/" component={JobHunt} />
            <GlobalRoute path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/searchusers" component={SearchResult} />
            <PrivateRoute path="/jobs/:id/:source" component={SingleJob} />
            <PrivateRoute path="/introForm/" component={IntroForm} />

          </ThemeProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
