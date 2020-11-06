import classNames from "classnames";
import React from "react";
import mouse from "./images/mouse.png";
import keyboard from "./images/keyboard.png";
import "./tutorial.scss";

const Tutorial = (props: IProps) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <button className="open-tutorial" onClick={() => setOpen(!isOpen)}>
        Tutorial
      </button>
      <div className={classNames("tutorial", { open: isOpen })}>
        {props.gameTutorial && (
          <React.Fragment>
            <div>Use the arrows to play</div>
            <img src={keyboard} alt="keyboard" />
            <div>Finish the game before the steps finish</div>
          </React.Fragment>
        )}
        {props.sandboxTutorial && (
          <React.Fragment>
            <div>Click on an element to create a path</div>
            <img src={mouse} alt="mouse" />
            <div>Use the right click for additional options</div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export interface IProps {
  gameTutorial?: boolean;
  sandboxTutorial?: boolean;
}

export default Tutorial;
