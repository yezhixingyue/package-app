import api from '../services';
const { getLogin } = api;

export default {
  state: {
    loginAuth: '',
  },
  reducer: {
    setLoginAuth(state, { payload }) {
      return {
        ...state,
        loginAuth: payload,
      };
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      let resp;
      try {
        resp = yield call(getLogin, {
          Mobile: username,
          Password: password,
          Terminal: 1,
        })
      } catch (error) {
        return;
      }
      if (resp.data.Status === 1000) {
        sessionStorage.setItem('loginAuth', resp.data.Data);
        return true;
      }
      return false;
    }
  },
  subscriptions: {
    getLoginAuthFromSesstionStorage({ dispatch }) {
      const _auth = sessionStorage.getItem('loginAuth');
      if (_auth) dispatch({ type: 'setLoginAuth', payload: _auth });
    }
  }
}