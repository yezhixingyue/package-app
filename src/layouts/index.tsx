import { connect } from 'umi';
import LayoutRootComp from '../components/LayoutComps';

const mapStateToProps = (state: { loginInfo: { userDetailInfo: any; }; }) => {
  return {
    userDetailInfo: state.loginInfo.userDetailInfo,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => void) => {
  return {
    getUserInfo: () => {
      dispatch({ type: 'loginInfo/getUserInfo' });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutRootComp);