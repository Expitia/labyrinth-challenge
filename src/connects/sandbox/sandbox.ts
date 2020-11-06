import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import {
  AssignEnd,
  AssignPath,
  AssignStart,
  SetSize,
} from "../../actions/sandbox.actions";
import Sandbox, { IProps } from "../../components/sandbox/sandbox";
import { IState } from "../../reducers/store";

const mapStateToProps = (state: IState): IProps => {
  return {
    size: state.sandbox.size,
    table: state.sandbox.table,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      onAssignEnd: AssignEnd,
      onAssignPath: AssignPath,
      onAssignStart: AssignStart,
      onConfigChange: SetSize,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sandbox)
);
