import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import home from "./home";
import chat from "./app/chat/chat";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route exact path="/chat" component={chat}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
