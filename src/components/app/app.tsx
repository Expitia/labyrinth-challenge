import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "../../connects/game/game";
import Header from "../../connects/header/header";
import Sandbox from "../../connects/sandbox/sandbox";
import { Routes } from "../../models";
import { history } from "./../../reducers/store";
import "./app.scss";

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route exact path={Routes.HOME}>
            <Game />
          </Route>
          <Route exact path={Routes.CREATE}>
            <Sandbox />
          </Route>
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
