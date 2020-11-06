import React from "react";
import "./header.scss";
import { BiArrowBack, BiImport, BiWorld } from "react-icons/bi";
import { RiRestartLine } from "react-icons/ri";
import { GiFootsteps } from "react-icons/gi";
import { AiOutlineClear } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { Routes } from "../../models";
import { useHistory } from "react-router-dom";
import { openFile } from "../../utils";

const Header = (props: IProps) => {
  const history = useHistory();

  return (
    <div className="app-header">
      {props.route === Routes.CREATE && (
        <React.Fragment>
          <span
            className="header-option"
            onClick={() => history.push(Routes.HOME)}
          >
            <BiArrowBack className="nav-item-icon" />
            <span className="header-action">Back</span>
          </span>
          <div className="header-section">
            <span className="header-option" onClick={props.onResetSandbox}>
              <AiOutlineClear className="nav-item-icon" />
              <span className="header-action">Reset</span>
            </span>
            <span className="header-option" onClick={props.onExportMap}>
              <BiImport className="nav-item-icon" />
              <span className="header-action">Export Map</span>
            </span>
          </div>
        </React.Fragment>
      )}
      {props.route === Routes.HOME && (
        <React.Fragment>
          <div className="header-section">
            <span className="header-option" onClick={props.onNewGame}>
              <RiRestartLine className="nav-item-icon" />
              <span className="header-action">New Game</span>
            </span>
            <span
              className="header-option"
              onClick={() => history.push(Routes.CREATE)}
            >
              <MdCreate className="nav-item-icon" />
              <span className="header-action">Create map</span>
            </span>
            <span
              className="header-option"
              onClick={() => openFile((map) => props.onImportMap({ map }))}
            >
              <BiImport className="nav-item-icon" />
              <span className="header-action">Import Map</span>
            </span>
          </div>
          <div className="header-section">
            <span className="header-option">
              <BiWorld className="nav-item-icon" />
              <span>Level: {props.level}</span>
            </span>
            <span className="header-option">
              <GiFootsteps className="nav-item-icon" />
              <span>Steps: {props.steps}</span>
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export interface IProps {
  route: string;
  level: number;
  steps: number;
  onNewGame?: () => void;
  onExportMap?: () => void;
  onResetSandbox?: () => void;
  onImportMap?: ({ map }) => void;
}

export default Header;
