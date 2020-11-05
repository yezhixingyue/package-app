import api from '../services';
import delay from '../assets/js/utils/delay'
import model from '../assets/js/utils/model';


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
      curOrderData.UnPrintKindCount = curOrderData.UnPrintKindCount - packageData.IncludeKindCount < 0 ? 0 : curOrderData.UnPrintKindCount - packageData.IncludeKindCount;
      list.unshift(curOrderData);
      // 此处保存缓存
      sessionStorage.setItem('printedList', JSON.stringify(list));
      return {
        ...state,
        hasPrintedPackageList: list,
      }
    },
    reStoreDataFromStorage(state, { payload }) { // 从缓存中取数据还原 || 或者是对其进行直接赋值null等操作
      if (!payload) {
        return { ...state };
      };
      return {
        ...state,
        hasPrintedPackageList: payload,
      }
    },
    changeModifyKind(state, { payload }) {
      if (!payload) throw new Error('changeModifyKind payload error!');
      const { packageID, includeKind, orderID } = payload;
      if (!packageID || !includeKind || !orderID) throw new Error('changeModifyKind payload args error!');
      const _list = state.hasPrintedPackageList;
      const _t = _list.find(it => it.OrderID === orderID);
      if (!_t) throw new Error('can not find target order!');
      const _targetPackage = _t.PackageList.find(packageItem => packageItem.PackageID === packageID);
      if (_targetPackage) {
        _t.UnPrintKindCount = _t.UnPrintKindCount - (includeKind - _targetPackage.IncludeKindCount);
        _targetPackage.IncludeKindCount = includeKind;
        sessionStorage.setItem('printedList', JSON.stringify(_list));
      }
      return {
        ...state,
        hasPrintedPackageList: _list,
      }
    },
    changeRePrintData(state, { payload }) {
      const { orderID, packageData } = payload;
      const { PackageID } = packageData;
      const _list = state.hasPrintedPackageList;
      const _t = _list.find(it => it.OrderID === orderID);
      if (_t) {
        _t.PackageList = _t.PackageList.filter(it => it.PackageID !== packageData.PackageID);
        _t.PackageList.unshift(packageData);
        sessionStorage.setItem('printedList', JSON.stringify(_list));
      }
      return {
        ...state,
        hasPrintedPackageList: _list,
      }
    },
    filterCanceledPackage(state, { payload }) {
      const { packageID, orderID } = payload;
      const _list = state.hasPrintedPackageList;
      const _t = _list.find(it => it.OrderID === orderID);
      if (_t) {
        const _targetPackage = _t.PackageList.find(_it => _it.PackageID === packageID);
        _t.UnPrintKindCount = _t.UnPrintKindCount + _targetPackage.IncludeKindCount;
        _targetPackage.Status = 255;
        sessionStorage.setItem('printedList', JSON.stringify(_list));
      }
      return {
        ...state,
        hasPrintedPackageList: _list,
      }
    },
  },
  effects: {
    *getPrintPackageOrderInfo({ payload }, { call }) { // 根据订单号获取打印标签信息
      let res;
      try {
        res = yield call(api.getPrintPackageOrderInfo, payload);
      } catch (error) {
        model.showWarn({ title: '获取订单信息', msg: error });
        return false;
      }
      if (res && res.data.Status === 1000) {
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
        model.showWarn({ title: '打印失败', msg: error });
        return false;
      }
      if (res && res.data.Status === 1000) {
        // getPrintPackage  此处有2个东西需要处理 ： 1. 打印标签  2. 把返回的结果存入到仓库中(已完成)
        yield put({ type: 'addItemDataToPackageList', payload: { packageData: res.data.Data, curOrderData }});
        return res.data.Data;
      }
      return false;
    },
    *getPrintPackageCancle({ payload }, { call, put }) { // 包裹撤销
      if (!payload) return false;
      const { packageID } = payload;
      if (!packageID) {
        model.showWarn({ title: '包裹撤销失败', msg: '获取信息失败' });
        return false;
      }
      let res;
      try {
        res = yield call(api.getPrintPackageCancle, packageID);
        if (res.data.Status === 1000) {
          console.log(res.data.Data, '包裹撤销');
          // 任务： 在数据仓库中修改相应包裹的打印记录 
          yield put({ type: 'filterCanceledPackage', payload });
          return true;
        }
      } catch (error) {
        model.showWarn({ title: '包裹撤销失败', msg: error });
        return false;
      }
    },
    *getModifyKindChange({ payload }, { call, put }) { // 更改包裹款数
      if (!payload) return false;
      const { packageID, includeKind } = payload;
      if (!packageID || !includeKind) {
        model.showWarn({ title: '更改款数失败', msg: '信息不完整' });
        return false;
      }
      let res;
      try {
        res = yield call(api.getModifyKindChange, payload);
        if (res.data.Status === 1000) {
          console.log(res, '更改款数成功');
          // 更改款数成功 需修改仓库状态
          yield put({ type: 'changeModifyKind', payload });
          return true;
        }
      } catch (error) {
        model.showWarn({ title: '更改款数失败', msg: error });
        return false;
      }
    },
    *ReprintPackage({ payload }, { call, put }) { // 重新打印标签
      if (!payload) return false;
      const { packageID, orderID } = payload;
      if (!packageID) {
        model.showWarn({ title: '重新打印失败', msg: error });
        return false;
      }
      let res;
      try {
        res = yield call(api.ReprintPackage, packageID);
        if (res.data.Status === 1000) {
          console.log(res, '重新打印');
          // 2个任务：  1. 重新打印标签  2. 在数据仓库中修改相应包裹的打印记录 
          yield put({ type: 'changeRePrintData', payload: { orderID, packageData: res.data.Data }})
          return true;
        }
      } catch (error) {
        model.showWarn({ title: '重新打印失败', msg: error });
        return false;
      }
    }
  },
  subscriptions: {
    reStoreDataFromStorage({ dispatch }) {
      const storagePrintedList = sessionStorage.getItem('printedList');
      if (storagePrintedList) {
        dispatch({ type: 'reStoreDataFromStorage', payload: JSON.parse(storagePrintedList) });
      }
    }
  }
}