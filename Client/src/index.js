import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/redux";
import { PersistGate } from 'redux-persist/integration/react'
import App from "./App";
import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { persistStore } from 'redux-persist'

import { BrowserRouter } from "react-router-dom";
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
