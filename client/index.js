import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import history from "./history";
import store from "./store";
import App from "./app";

ReactDOM.render(
  <SnackbarProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("app")
);
