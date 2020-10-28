import LoginComp from '../../LoginComps/LoginComp';
import { connect } from 'umi';

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: object; }) => any) => {
  return {
    async onLogin(payload: object) {
      const res = await dispatch({ type: 'loginInfo/login', payload });
      if (res) return true;
      return false;
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginComp);