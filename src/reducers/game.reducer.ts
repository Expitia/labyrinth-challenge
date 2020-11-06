import { createReducer } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import {
  ImportMap,
  MoveTable,
  NewGame,
  SetSize,
} from "../actions/game.actions";
import { Cell, Coord, Directions, ParserMap, Size } from "../models";
import { createMaze, fillTable, selectRoute } from "../utils";

export interface IState {
  size?: Size;
  steps?: number;
  table: Cell[][];
  position?: Coord;
  endCoord?: Coord;
  level: number;
  gameOver: boolean;
  text?: string;
}

export const defaultState: IState = {
  level: 0,
  table: [],
  gameOver: false,
};

const importMap = (state: IState, { payload }) => {
  const rows = payload.map
    .split("\n")
    .map((columnString, i) => (i > 0 ? columnString.split("") : columnString));

  state.level = 0;
  state.gameOver = false;
  state.steps = parseFloat(rows.shift());
  state.table = rows.map((row, irow) =>
    row.map((column, icolumn) => {
      column = parseFloat(column);
      const cell: Cell = {};
      if (column === ParserMap.END) cell.isEnd = true;
      else if (column === ParserMap.PATH) cell.isPath = true;
      else if (column === ParserMap.START) {
        cell.isPath = true;
        cell.isStart = true;
        state.position = {
          row: irow,
          column: icolumn,
          direction: Directions.DOWN,
        };
      }
      return cell;
    })
  );
  return state;
};

const moveTable = (state: IState, { payload }) => {
  const { row, column } = state.position;
  let newRow = row,
    newColumn = column;

  if (!state.gameOver) {
    if (payload.direction === Directions.UP) newRow--;
    else if (payload.direction === Directions.DOWN) newRow++;
    else if (payload.direction === Directions.LEFT) newColumn--;
    else if (payload.direction === Directions.RIGHT) newColumn++;

    const cell = state.table[newRow] && state.table[newRow][newColumn];

    state.position = {
      direction: payload.direction,
      row: cell?.isPath ? newRow : row,
      column: cell?.isPath ? newColumn : column,
    };
    if (cell?.isPath) state.steps--;
    if (cell?.isEnd) if (state.level++ <= 2) newTable(state);
    state.gameOver = state.level > 2 || state.steps < 0;
  }
  return state;
};

const setSize = (state: IState, { payload }) => {
  state.size = payload;
  return newTable(state);
};

const newGame = (state: IState) => {
  state.level = 0;
  state.gameOver = false;
  return newTable(state);
};

const newTable = (state: IState) => {
  let startRow = 0;
  let startColumn = 0;
  const { width, height } = state.size;
  state.table = fillTable(width, height);
  while (startRow % 2 === 0) startRow = Math.floor(Math.random() * height);
  while (startColumn % 2 === 0) startColumn = Math.floor(Math.random() * width);
  state.table[startRow][startColumn].isPath = true;
  state.table[startRow][startColumn].isStart = true;
  state.position = {
    row: startRow,
    column: startColumn,
    direction: Directions.DOWN,
  };

  const paths: Record<number, Coord[]> = [];
  createMaze(
    startRow,
    startColumn,
    state.size.width,
    state.size.height,
    state.table,
    paths
  );
  const route = selectRoute(state.table, paths);
  state.steps = route.steps;
  state.endCoord = route.lastCoord;
  state.table[route.lastCoord.row][route.lastCoord.column].isEnd = true;
  return state;
};

export const game: Reducer = createReducer(defaultState, {
  [SetSize.toString()]: setSize,
  [NewGame.toString()]: newGame,
  [MoveTable.toString()]: moveTable,
  [ImportMap.toString()]: importMap,
});

export default game;
