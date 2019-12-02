import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

// import home from "./home";
// import chat from "./app/chat/chat";

import Join from "./app/components/Join";
import Chat from "./app/components/Chat";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Join}></Route>
          <Route exact path="/chat" component={Chat}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
