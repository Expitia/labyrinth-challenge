export enum Directions {
  UP = 0,
  DOWN = 1,
  LEFT = 3,
  RIGHT = 2,
}

export enum ParserMap {
  END = 2,
  WALL = 1,
  PATH = 0,
  START = 3,
}

export enum Routes {
  HOME = "/",
  CREATE = "/create",
}

export enum KeysMove {
  UP = "&",
  DOWN = "(",
  LEFT = "%",
  RIGHT = "'",
}

export interface Coord {
  row: number;
  column: number;
  direction?: Directions;
}

export interface Size {
  width: number;
  height: number;
  steps?: number;
}

export interface Cell {
  path?: number;
  isEnd?: boolean;
  isPath?: boolean;
  isStart?: boolean;
}
