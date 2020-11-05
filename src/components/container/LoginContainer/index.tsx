import LoginComp from '../../LoginComps/LoginComp';
import { connect } from 'umi';

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: object | null; }) => any) => {
  return {
    async onLogin(payload: object) {
      const res = await dispatch({ type: 'loginInfo/login', payload });
      // 下方为登录成功后对旧的部分登录状态进行清理
      if (res) {
        await dispatch({ type: 'packageStore/reStoreDataFromStorage', payload: []  }); // 清除已打印包裹列表信息
        await dispatch({ type: 'loginInfo/setUserDetailInfo', payload: null  }); // 清除旧的登录账号详情信息
      }
      
      return res;
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginComp);