import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatsList from "./components/ChatsList";
import Chat from "./components/Chat";
import Login from "./components/Login";

function appReducer(state = {}, action) {
  switch (action.type) {
    case "Login": {
      return {
        ...state,
        username: action.payload.username,
        chats: action.payload.chats,
        socket: action.payload.socket
      };
    }
    default: {
      return state;
    }
  }
}
export const Context = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(appReducer, {});

  return (
    <Context.Provider value={[state, dispatch]}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/chats" component={ChatsList} />
          {/**<Route exact path="/chat/:id" component={Chat} />**/}
        </div>
      </Router>
    </Context.Provider>
  );
};

export default App;
