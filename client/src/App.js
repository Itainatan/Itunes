import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Itunes from "./components/Itunes";
import Login from "./components/Login";
import Song from "./components/Song";
import "./components/main.scss";
import SecureRoute from './components/SecureRoute'

export const Context = React.createContext();

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/itunes" component={Itunes} /> */}
        <SecureRoute exact path="/itunes" component={Itunes} />
        <Route exact path="/itunes/:id" render={props => <Song {...props} />} />
      </div>
    </Router>
  );
};

export default App;
