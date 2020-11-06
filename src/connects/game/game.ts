import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IState } from "../../reducers/store";
import Game, { IProps } from "../../components/game/game";
import { MoveTable, SetSize } from "../../actions/game.actions";

const mapStateToProps = (state: IState): IProps => {
  return {
    size: state.game.size,
    level: state.game.level,
    table: state.game.table,
    gameOver: state.game.gameOver,
    position: state.game.position,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      onMove: MoveTable,
      onConfigChange: SetSize,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
