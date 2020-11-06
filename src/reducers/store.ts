import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import game, { IState as IHomeState } from "./game.reducer";
import sandbox, { IState as ISandboxState } from "./sandbox.reducer";

export interface IState {
  game: IHomeState;
  router: RouterState;
  sandbox: ISandboxState;
}

export const history = createBrowserHistory();

const reducers: Reducer<IState> = combineReducers({
  game,
  sandbox,
  router: connectRouter(history),
});

const middleWare = applyMiddleware(routerMiddleware(history), thunk);

export const newStore = (initialState?) => {
  const store: Store<IState> = createStore(reducers, initialState, middleWare);
  return store;
};

export type StoreType = ReturnType<typeof newStore>;
