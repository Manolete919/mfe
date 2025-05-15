import React from "react";
import ReactDom from "react-dom";
import App from "./App"
//define mount function
const mount = (el) => {
  ReactDom.render(
    <App />,
    el
  );
};

// running in development
if(process.env.NODE_ENV === 'development'){
  const devRoot = document.querySelector('#_marketing-dev-root');
  if(devRoot){
    mount(devRoot);
  }
}
  // running through a container
  export { mount };