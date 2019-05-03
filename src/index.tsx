import React from "react";
import ReactDOM from "react-dom";
import { App } from "./view/components/App";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "./view/store";
import { Provider } from "react-redux";

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
