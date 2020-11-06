import { createAction } from "@reduxjs/toolkit";
import { Directions, Size } from "../models";

export const MoveTable = createAction<{ direction: Directions }>(
  "Move the position in table"
);

export const NewGame = createAction("Create a new table");

export const SetSize = createAction<Size>("Set the size of table");

export const ImportMap = createAction<{ map: string }>("Import new map");
