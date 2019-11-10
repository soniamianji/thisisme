import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/page/Login";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Welcome to this is me</h1>
        <Login />
      </div>
    </Provider>
  );
}

export default App;
