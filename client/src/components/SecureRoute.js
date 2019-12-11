import React from "react";
import { Route, Redirect } from "react-router-dom";


const SecureRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    sessionStorage.getItem('user') ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
  }
  />
)

export default SecureRoute;
