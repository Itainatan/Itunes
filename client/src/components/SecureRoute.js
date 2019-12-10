import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


const SecureRoute = (props) => {
  const user = sessionStorage.getItem('user');

  if(user){
    return <Route exact {...props}/>
  }
  else {
    return <Redirect
    to={{
    pathname: "/"
    }}
    />
  }
};

export default SecureRoute;
