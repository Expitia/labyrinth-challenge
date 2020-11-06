import { createReducer } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import {
  AssignEnd,
  AssignPath,
  AssignStart,
  ExportMap,
  ResetSandbox,
  SetSize,
} from "../actions/sandbox.actions";
import { Cell, ParserMap, Size } from "../models";
import { fillTable } from "../utils";

export interface IState {
  size?: Size;
  steps: number;
  table: Cell[][];
}

export const defaultState: IState = {
  steps: 0,
  table: [],
};

export const setSize = (state: IState, { payload }) => {
  state.size = payload;
  state.steps = payload.steps || 0;
  state.table = fillTable(state.size.width, state.size.height);
  return state;
};

export const assignPath = (state: IState, { payload }) => {
  const { row, column } = payload;
  state.table[row][column].isPath = true;
  return state;
};

export const resetSandbox = (state: IState) => {
  state.table = fillTable(state.size.width, state.size.height);
  return state;
};

export const assignStart = (state: IState, { payload }) => {
  const { row, column } = payload;
  state.table.forEach((row) =>
    row.forEach((cell) => {
      cell.isStart = false;
    })
  );
  state.table[row][column].isEnd = false;
  state.table[row][column].isStart = true;
  return state;
};

export const assignEnd = (state: IState, { payload }) => {
  const { row, column } = payload;
  state.table.forEach((row) =>
    row.forEach((cell) => {
      cell.isEnd = false;
    })
  );
  state.table[row][column].isEnd = true;
  state.table[row][column].isStart = false;
  return state;
};

const exportMap = (state: IState) => {
  const rows: string[] = state.table.map((row) =>
    row
      .map((cell) => {
        if (cell.isEnd) return ParserMap.END;
        else if (cell.isPath) return ParserMap.PATH;
        else if (cell.isStart) return ParserMap.START;
        else return ParserMap.WALL;
      })
      .join("")
  );
  const content = `${state.steps}\n${rows.join("\n")}`;
  const uri = "data:application/octet-stream," + encodeURIComponent(content);
  window.location.href = uri;
  return state;
};

export const sandbox: Reducer = createReducer(defaultState, {
  [SetSize.toString()]: setSize,
  [AssignEnd.toString()]: assignEnd,
  [AssignStart.toString()]: assignStart,
  [AssignPath.toString()]: assignPath,
  [ResetSandbox.toString()]: resetSandbox,
  [ExportMap.toString()]: exportMap,
});

export default sandbox;
