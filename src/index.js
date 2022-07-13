import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./components/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function Index() {
  return (
    <div className="component">
      <ContextProvider>
        <HelmetProvider>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </HelmetProvider>
      </ContextProvider>
    </div>
  );
}
ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
