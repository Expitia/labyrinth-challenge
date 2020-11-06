import classNames from "classnames";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cell, Coord, Directions, KeysMove, Size } from "../../models";
import Configurator from "../configurator/configurator";
import KeyboardEventHandler from "../keyboard/keyboard";
import Tutorial from "../tutorial/tutorial";
import "./game.scss";

const Game = (props: IProps) => {
  const table = React.useRef<HTMLDivElement>();
  const [style, setStyle] = React.useState<Style>({});

  React.useEffect(() => {
    setStyle({
      ...style,
      "--row": props.position?.row || 0,
      "--column": props.position?.column || 0,
      "--direction": props.position?.direction || 0,
    });
  }, [props.position]);

  React.useEffect(() => {
    if (props.gameOver && props.level <= 2) toast("Game Over!");
    else if (props.gameOver && props.level > 2) toast("Congratulation!");
    else if (props.level > 0) toast("Next Level!");
    table.current.blur();
  }, [props.level, props.gameOver]);

  return (
    <KeyboardEventHandler
      handleKeys={Object.values(KeysMove)}
      onKeyEvent={(key) => {
        let direction: Directions;
        if (key === KeysMove.UP) direction = Directions.UP;
        else if (key === KeysMove.LEFT) direction = Directions.LEFT;
        else if (key === KeysMove.DOWN) direction = Directions.DOWN;
        else if (key === KeysMove.RIGHT) direction = Directions.RIGHT;
        props.onMove({ direction });
      }}
    >
      <ToastContainer />
      <Tutorial gameTutorial />
      <Configurator
        hideSteps
        size={props.size}
        obSubmit={props.onConfigChange}
      />
      <div className="table" tabIndex={0} ref={table}>
        {!!props.table.length && <div style={style} className="player" />}
        {props.table.map((item, i) => (
          <div className="row" key={i}>
            {item.map((cell, j) => (
              <div
                key={j}
                className={classNames(`cell world-${props.level}`, {
                  "cell-end": cell.isEnd,
                  "cell-empty": cell.isPath,
                  "cell-full": !cell.isPath,
                  "cell-start": cell.isStart,
                })}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </KeyboardEventHandler>
  );
};

interface Style extends React.CSSProperties {
  "--row"?: number;
  "--column"?: number;
  "--direction"?: number;
}

export interface IProps {
  size: Size;
  level: number;
  table: Cell[][];
  position: Coord;
  gameOver: boolean;
  onMove?: ({ direction }) => void;
  onConfigChange?: ({ width, height }) => void;
}

export default Game;
