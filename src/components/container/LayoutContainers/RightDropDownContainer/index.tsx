import { connect, history } from 'umi';
import RightDropDown from '../../../LayoutComps/RightDropDown'

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: {}; }) => void) => {
  return {
    onLoginout() {
      dispatch({ type: 'loginInfo/loginout', payload: {} });
    }
  }
}

export default connect(null, mapDispatchToProps)(RightDropDown);
