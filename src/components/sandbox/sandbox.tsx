import React from "react";
import classNames from "classnames";
import { Cell, Size } from "../../models";
import "./sandbox.scss";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Tutorial from "../tutorial/tutorial";
import Configurator from "../configurator/configurator";

const Sandbox = (props: IProps) => {
  return (
    <div className="sandbox">
      <Tutorial sandboxTutorial />
      <Configurator size={props.size} obSubmit={props.onConfigChange} />
      {props.table.map((item, i) => (
        <div className="row" key={i}>
          {item.map((cell, j) => (
            <React.Fragment key={j}>
              <ContextMenuTrigger id={`${i} - ${j}`}>
                <div
                  onClick={() => props.onAssignPath({ row: i, column: j })}
                  className={classNames(`cell`, {
                    "cell-end": cell.isEnd,
                    "cell-empty": cell.isPath,
                    "cell-full": !cell.isPath,
                    "cell-start": cell.isStart,
                  })}
                ></div>
              </ContextMenuTrigger>
              <ContextMenu id={`${i} - ${j}`}>
                <MenuItem
                  onClick={() => props.onAssignStart({ row: i, column: j })}
                >
                  Assign as starting position
                </MenuItem>
                <MenuItem
                  onClick={() => props.onAssignEnd({ row: i, column: j })}
                >
                  Assign as end position
                </MenuItem>
              </ContextMenu>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export interface IProps {
  size: Size;
  table: Cell[][];
  onAssignEnd?: ({ row, column }) => void;
  onAssignPath?: ({ row, column }) => void;
  onAssignStart?: ({ row, column }) => void;
  onConfigChange?: ({ width, height, steps }) => void;
}

export default Sandbox;
