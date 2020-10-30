import api from '../services';
import { history } from 'umi';
import delay from '../assets/js/utils/delay'
const { getLogin } = api;


export default {
  state: {
    userDetailInfo: null,
  },
  reducers: {
    setUserDetailInfo(state, { payload }) {
      return {
        ...state,
        userDetailInfo: payload,
      }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      sessionStorage.removeItem('loginAuth');
      sessionStorage.removeItem('userDetailInfo');
      yield put({ type: 'setUserDetailInfo', payload: null });
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
    },
    *loginout({ payload }, { call }) {
      sessionStorage.removeItem('loginAuth');
      sessionStorage.removeItem('userDetailInfo');
      yield call(delay, 30);
      history.push('/login');
    },
    *getUserInfo({ payload }, { call, put, select }) {
      const userDetailInfo = yield select(state =>  state.loginInfo.userDetailInfo);
      if (userDetailInfo) return;
      let res;
      try {
        res = yield call(api.getStaffDetail)
      } catch (error) {
        return;
      }
      if (res.data.Status === 1000) {
        sessionStorage.setItem('userDetailInfo', JSON.stringify(res.data.Data));
        yield put({ type: 'setUserDetailInfo', payload: res.data.Data });
      }
      return false;
    }
  },
  subscriptions: {
    getUserDetailInfoFromSesstionStorage({ dispatch }) {
      const userDetailInfo = sessionStorage.getItem('userDetailInfo');
      if (userDetailInfo) dispatch({ type: 'setUserDetailInfo', payload: JSON.parse(userDetailInfo) });
    }
  }
}