import api from '../services';
import delay from '../assets/js/utils/delay'


export default {
  state: {
    curPrintDiaInfo: null,
    curPrintDiaOnState: false,

  },
  reducers: {
    setCurPrintInfo(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      }
    }
  },
  effects: {
    *getPrintPackageOrderInfo({ payload }, { call }) { // 根据订单号获取打印标签信息
      let res;
      try {
        res = yield call(api.getPrintPackageOrderInfo, payload);
      } catch (error) {
        return false;
      }
      if (res.data.Status === 1000) {
        return res.data.Data;
      }
      return false;
    },
    *getPrintPackage({ payload }, { call }) { // 获取打印标签信息
      let res;
      try {
        res = yield call(api.getPrintPackage, payload);
      } catch (error) {
        return false;
      }
      if (res.data.Status === 1000) {
        return res.data.Data;
      }
      return false;
    }
  },
  subscriptions: {

  }
}