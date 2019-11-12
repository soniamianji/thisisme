import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/page/Login";
import Profile from "./components/page/Profile";
import SearchResult from "./components/page/SearchResult";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Auth from './modules/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render = {props => Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect 
        to={{pathname: "/login", state: { from: props.location }}}
      />
    )
    }
  />
)

const GlobalRoute = ({ component: Component, ...rest }) => (
  <Route  {...rest} render = {props => ( <Component {...props} {...rest} /> ) } />
)


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <GlobalRoute exact path="/" component={Login} />
          <GlobalRoute path="/searchresult" component={SearchResult} />
          <PrivateRoute path="/profile" component={Profile} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
