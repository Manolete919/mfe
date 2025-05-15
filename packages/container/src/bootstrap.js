import React from "react";
import ReactDom from "react-dom";
import App from "./App"
// we dont need the mount function for the container
ReactDom.render(
  <App />,
  document.querySelector('#root')
);