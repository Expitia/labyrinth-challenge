import { createAction } from "@reduxjs/toolkit";
import { Coord, Size } from "../models";

export const ResetSandbox = createAction("Reset the sanbox");

export const SetSize = createAction<Size>("Set the size of sandbox");

export const AssignPath = createAction<Coord>("Set a path in the sandbox");

export const AssignStart = createAction<Coord>("Set start position");

export const AssignEnd = createAction<Coord>("Set end position");

export const ExportMap = createAction("Export current map");
