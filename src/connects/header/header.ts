import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IState } from "../../reducers/store";
import Header, { IProps } from "../../components/header/header";
import { ImportMap, NewGame } from "../../actions/game.actions";
import { ExportMap, ResetSandbox } from "../../actions/sandbox.actions";

const mapStateToProps = (state: IState): IProps => {
  return {
    level: state.game.level,
    steps: state.game.steps,
    route: state.router.location.pathname,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      onNewGame: NewGame,
      onExportMap: ExportMap,
      onImportMap: ImportMap,
      onResetSandbox: ResetSandbox,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
