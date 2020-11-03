import api from '../services';
import delay from '../assets/js/utils/delay'


export default {
  state: {
    curPrintDiaInfo: null, // 当前请求到的要打印的订单信息
    curPrintDiaOnState: false, // 是否展示打印输入款数的弹窗
    hasPrintedPackageList: [], // 已打印的包裹列表
  },
  reducers: {
    setCurPrintInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    setModelState(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      }
    },
    addItemDataToPackageList(state, { payload }) {
       //大于0的情况， 需要判断： 1.原列表中是否有该订单 如果是则添加混合在一起  2.如果没有则整体添加到列表中
      const { packageData, curOrderData } = payload;
      let list = state.hasPrintedPackageList.filter(it => it.OrderID !== curOrderData.OrderID);
      curOrderData.PackageList.push(packageData);
      curOrderData.PackageList.reverse();
      curOrderData.UnPrintKindCount = curOrderData.UnPrintKindCount - packageData.IncludeKindCount;
      list.unshift(curOrderData);
      // 此处保存缓存
      return {
        ...state,
        hasPrintedPackageList: list,
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
    *getPrintPackage({ payload }, { call, put }) { // 获取打印标签信息
      let res;
      const { OrderID, IncludeKindCount, curOrderData } = payload;
      try {
        res = yield call(api.getPrintPackage, { OrderID, IncludeKindCount });
      } catch (error) {
        return false;
      }
      if (res.data.Status === 1000) {
        // getPrintPackage  此处有2个东西需要处理 ： 1. 打印标签  2. 把返回的结果存入到仓库中
        yield put({ type: 'addItemDataToPackageList', payload: { packageData: res.data.Data, curOrderData }});
        return res.data.Data;
      }
      return false;
    }
  },
  subscriptions: {

  }
}