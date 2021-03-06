import api from '../services';
import delay from '../assets/js/utils/delay'
import { isEmpty, formartDate } from '../assets/js/utils/utils'
import model from '../assets/js/utils/model';
import getDate from '../assets/js/date';
import lodopPrint from '../assets/js/lodopPrint';

const isWindowPrint = false;

const setAndFilterDate = obj => {
  if (!obj.dateType) return;
  switch (obj.dateType) {
    case 'all':
      delete obj.PrintTime;
      break;
    case 'today': 
      obj.PrintTime = getDate.TodayDate();
      break;
    case 'yestday': 
      obj.PrintTime = getDate.YesterdayDate();
      break;
    case 'week': 
      obj.PrintTime = getDate.curWeek();
      break;
    case 'month': 
      obj.PrintTime = getDate.curMonthDate();
      break;
    case 'define': 
      obj.PrintTime = {
        First: `${obj.First}T00:00:00.000`,
        Second: `${obj.Second}T23:59:59.997`,
      }
      delete obj.First;
      delete obj.Second;
      break;
    default:
      break;
  }
}

const handlePrint = (orderID, packageID) => {
  const oPrintBtn = document.querySelector('.mp-print-btn-wrap .mp-print-btn');
  if(oPrintBtn) {
    oPrintBtn.click();
  } else {
    model.showWarn({ title: '抱歉，当前包裹标签打印失败', msg: `订单号：[ ${orderID} ]，包裹号：[ ${packageID} ]，请补印` });
  }
}

const handleLodopPrint = (packageDate, orderData, userInfo) => {
  const { Consignee, Mobile, AddressDetail, ExpressArea } = orderData.Address.Address;
  const { RegionalName, CityName, CountyName } = ExpressArea;
  const address = `${RegionalName}${CityName}${CountyName}${AddressDetail}`;
  const { ProductName, ProductClass, SizeString, ProductAmount, Content, KindCount, Unit, Address, CustomerSN, CustomerName } = orderData;
  const { StationSN, StationName, DistrictSN } = Address.Delivery;
  const { ExpressText } = Address;
  const LastPrintTime = formartDate(packageDate.LastPrintTime);
  const PackageID = packageDate.PackageID;
  lodopPrint({ StationSN, StationName, DistrictSN, CustomerSN, ExpressText, CustomerName, Consignee, Mobile, address, userInfo, ProductClass, ProductName, KindCount, ProductAmount, Unit, SizeString, Content, LastPrintTime, PackageID });
}

export default {
  state: {
    curPrintDiaInfo: null, // 当前请求到的要打印的订单信息
    curPrintPackage: null, // 当前打印包裹信息
    curPrintDiaOnState: false, // 是否展示打印输入款数的弹窗
    hasPrintedPackageList: [], // 已打印的包裹列表
    printLabelSearchWords: '', // 标签打印页搜索关键字s
    printLabelSearchResult: null, // 标签打印页搜索结果
    condition4SubmitList: { // 提交入库列表的获取条件
      page: 1,
      pageSize: 6,
      factoryID: '',
    },
    submitResult: {
      OrderList: [],
      FinishOrderCount: 0,
      PackageCount: 0,
      UnFinishOrderCount: 0,
      DataNumber: 0,
    }, // 提交入库列表
    FactoryList: [],
    condition4LogList: {
      Page: 1,
      PageSize: 10,
      FactoryID: '',
      KeyWords: '',
      PrintTime: {
        First: '',
        Second: '',
      },
      oldKeyWords: '',
      dateType: 'today',
    },
    logResult: {
      DataNumber: 0,
      Message: 0,
      logList: [],
    },
  },
  reducers: {
    setCurPrintInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    setModelState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    addItemDataToPackageList(state, { payload }) {
       //大于0的情况， 需要判断： 1.原列表中是否有该订单 如果是则添加混合在一起  2.如果没有则整体添加到列表中
       console.log(payload);
      const { packageData, curOrderData, user } = payload;
      let list = state.hasPrintedPackageList.filter(it => it.OrderID !== curOrderData.OrderID);
      curOrderData.PackageList.push(packageData);
      curOrderData.PackageList.reverse();
      curOrderData.UnPrintKindCount = packageData.UnPrintKindCount;
      curOrderData.IncludeKindCount = curOrderData.IncludeKindCount + packageData.IncludeKindCount > curOrderData.KindCount ? curOrderData.KindCount : curOrderData.IncludeKindCount + packageData.IncludeKindCount;
      if (curOrderData.IncludeKindCount > curOrderData.KindCount - curOrderData.UnPrintKindCount) curOrderData.IncludeKindCount = curOrderData.KindCount - curOrderData.UnPrintKindCount;
      list = [curOrderData];

      
      // const _list = res.data.Data.reverse();
      list.forEach(it => {
        const canList = [];
        const otherList = [];
        const enteredList = [];
        it.PackageList.forEach(it2 => {
          if (it2.Status === 0 && it2.Printer.ID === user.StaffID) canList.push(it2);
          else if (it2.Status === 200) enteredList.push(it2);
          else otherList.push(it2);
        })
        it.PackageList = [...canList, ...otherList, ...enteredList]
      })
      // 此处保存缓存
      // sessionStorage.setItem('printedList', JSON.stringify(list));
      return {
        ...state,
        hasPrintedPackageList: list,
        curPrintDiaInfo: curOrderData,
        curPrintPackage: packageData,
      }
    },
    changeCurPrintOrderData(state, { payload }) {
      return {
        ...state,
        curPrintDiaInfo: payload,
      }
    },
    clearCurPrintInfo(state, { payload }) {
      return {
        ...state,
        curPrintDiaInfo: null,
        curPrintPackage: null,
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
      const { packageID, includeKind, orderID, UnPrintKindCount } = payload;
      console.log(payload);
      if (!packageID || !includeKind || !orderID) throw new Error('changeModifyKind payload args error!');
      const _list = state.hasPrintedPackageList;
      const _t = _list.find(it => it.OrderID === orderID);
      if (_t) {
        const _targetPackage = _t.PackageList.find(packageItem => packageItem.PackageID === packageID);
        if (_targetPackage) {
          _t.UnPrintKindCount = UnPrintKindCount;
          _t.IncludeKindCount = _t.IncludeKindCount + (includeKind - _targetPackage.IncludeKindCount);
          if (_t.IncludeKindCount > _t.KindCount) _t.IncludeKindCount = _t.KindCount;
          if (_t.IncludeKindCount < 0) _t.IncludeKindCount = 0;
          if (_t.IncludeKindCount > _t.KindCount - _t.UnPrintKindCount) _t.IncludeKindCount = _t.KindCount - _t.UnPrintKindCount;
          _targetPackage.IncludeKindCount = includeKind;
          sessionStorage.setItem('printedList', JSON.stringify(_list));
        }
      }
      const printLabelSearchResult = state.printLabelSearchResult;
      if (printLabelSearchResult && printLabelSearchResult.length > 0) {
        const _t2 = printLabelSearchResult.find(it => it.OrderID === orderID);
        if (_t2) {
          const _targetPackage = _t2.PackageList.find(packageItem => packageItem.PackageID === packageID);
          if (_targetPackage) {
            _t2.UnPrintKindCount = UnPrintKindCount;
            _t2.IncludeKindCount = _t2.IncludeKindCount + (includeKind - _targetPackage.IncludeKindCount);
            if (_t2.IncludeKindCount > _t2.KindCount) _t2.IncludeKindCount = _t2.KindCount;
            if (_t2.IncludeKindCount < 0) _t2.IncludeKindCount = 0;
            if (_t2.IncludeKindCount > _t2.KindCount - _t2.UnPrintKindCount) _t2.IncludeKindCount = _t2.KindCount - _t2.UnPrintKindCount;
            _targetPackage.IncludeKindCount = includeKind;
            return {
              ...state,
              printLabelSearchResult,
              hasPrintedPackageList: _list,
            }
          }
        }
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
      const printLabelSearchResult = state.printLabelSearchResult;
      if (printLabelSearchResult && printLabelSearchResult.length > 0) {
        const _t2 = printLabelSearchResult.find(it => it.OrderID === orderID);
        if (_t2) {
          const _index = _t2.PackageList.findIndex(it => it.PackageID === packageData.PackageID);
          if (_index || _index === 0) _t2.PackageList[_index] = packageData;
          return {
            ...state,
            printLabelSearchResult,
            hasPrintedPackageList: _list,
            curPrintPackage: packageData,
          }
        }
      }
      return {
        ...state,
        hasPrintedPackageList: _list,
        curPrintPackage: packageData,
      }
    },
    filterCanceledPackage(state, { payload }) {
      console.log(payload);
      const { packageID, orderID, UnPrintKindCount } = payload;
      const _list = state.hasPrintedPackageList;
      const _t = _list.find(it => it.OrderID === orderID);
      if (_t) {
        const _targetPackage = _t.PackageList.find(_it => _it.PackageID === packageID);
        if (!(_t.PackageList.filter(it => it.Status !== 255).length > _t.KindCount && _t.UnPrintKindCount === 0)) {
          _t.UnPrintKindCount = UnPrintKindCount;
          _t.IncludeKindCount = _t.IncludeKindCount - _targetPackage.IncludeKindCount;
          if (_t.IncludeKindCount > _t.KindCount) _t.IncludeKindCount = _t.KindCount;
          if (_t.IncludeKindCount < 0) _t.IncludeKindCount = 0;
          if (_t.IncludeKindCount > _t.KindCount - _t.UnPrintKindCount) _t.IncludeKindCount = _t.KindCount - _t.UnPrintKindCount;
        }
        _targetPackage.Status = 255;
        sessionStorage.setItem('printedList', JSON.stringify(_list));
      }
      const printLabelSearchResult = state.printLabelSearchResult;
      if (printLabelSearchResult && printLabelSearchResult.length > 0) {
        const _t2 = printLabelSearchResult.find(it => it.OrderID === orderID);
        if (_t2) {
          const _targetPackage = _t2.PackageList.find(_it => _it.PackageID === packageID);
          if (!(_t2.PackageList.filter(it => it.Status !== 255).length > _t2.KindCount && _t2.UnPrintKindCount === 0)) {
            _t2.UnPrintKindCount = UnPrintKindCount;
            _t2.IncludeKindCount = _t2.IncludeKindCount - _targetPackage.IncludeKindCount;
            if (_t2.IncludeKindCount > _t2.KindCount) _t2.IncludeKindCount = _t2.KindCount;
            if (_t2.IncludeKindCount < 0) _t2.IncludeKindCount = 0;
            if (_t2.IncludeKindCount > _t2.KindCount - _t2.UnPrintKindCount) _t2.IncludeKindCount = _t2.KindCount - _t2.UnPrintKindCount;
          }
          _targetPackage.Status = 255;
          return {
            ...state,
            printLabelSearchResult,
            hasPrintedPackageList: _list,
          }
        }
      }
      return {
        ...state,
        hasPrintedPackageList: _list,
      }
    },
    setPrintLabelSearchResult(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    setPrintLabelSearchWords(state, { payload }) {
      return {
        ...state,
        printLabelSearchWords: payload,
      }
    },
    setSubmitList(state, { payload }) {
      return {
        ...state,
        submitResult: {
          ...state.submitResult,
          ...payload,
        },
      }
    },
    changeCondition4SubmitList(state, { payload }) {
      return {
        ...state,
        condition4SubmitList: { ...payload },
      }
    },
    setFactoryList(state, { payload }) {
      return {
        ...state,
        FactoryList: [  { FactoryID: '', FactoryName: '所有工厂' }, ...payload ],
      }
    },
    changeCondition4LogList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        condition4LogList: { ...state.condition4LogList, ...payload },
      }
    },
    setLogList(state, { payload }) {
      return {
        ...state,
        logResult: { ...payload },
      }
    },
  },
  effects: {
    *getPrintPackageOrderInfo({ payload }, { call }) { // 根据订单号获取打印标签信息
      let res;
      try {
        res = yield call(api.getPrintPackageOrderInfo, payload);
      } catch (error) {
        model.showWarn({ title: '获取订单信息失败', msg: error });
        return false;
      }
      if (res && res.data.Status === 1000) {
        return res.data.Data;
      }
      return false;
    },
    *getPrintPackage({ payload }, { call, put, select }) { // 获取打印标签信息
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
        console.log('输入框打印标签');
        const user = yield select(state => state.loginInfo.userDetailInfo)
        const _tempObj = { ...res.data.Data, Printer: {ID: user.StaffID, Name: user.StaffName} };
        yield put({ type: 'addItemDataToPackageList', payload: { packageData: _tempObj, curOrderData, user }});
        if (isWindowPrint) {
          setTimeout(() => {
            handlePrint(OrderID, res.data.Data.PackageID);
          }, 100);
        } else {
          handleLodopPrint(_tempObj, curOrderData, user);
        }
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
          const _tempObj = { ...payload, UnPrintKindCount: res.data.Data }
          // 任务： 在数据仓库中修改相应包裹的打印记录 
          yield put({ type: 'filterCanceledPackage', payload: _tempObj });
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
      if (!packageID || (!includeKind && includeKind !== 0 )) {
        model.showWarn({ title: '更改款数失败', msg: '信息不完整' });
        return false;
      }
      if (includeKind === 0) {
        model.showWarn({ title: '更改款数失败', msg: '款数不能为0' });
        return false;
      }
      let res;
      try {
        res = yield call(api.getModifyKindChange, payload);
        if (res.data.Status === 1000) {
          const _tempObj = { ...payload, UnPrintKindCount: res.data.Data }
          // 更改款数成功 需修改仓库状态
          yield put({ type: 'changeModifyKind', payload: _tempObj });
          return true;
        }
        return false;
      } catch (error) {
        model.showWarn({ title: '更改款数失败', msg: error });
        return false;
      }
    },
    *ReprintPackage({ payload }, { call, put, select }) { // 重新打印标签
      if (!payload) return false;
      const { packageID, orderID } = payload;
      if (!packageID) {
        model.showWarn({ title: '重新打印失败', msg: '获取不到包裹号' });
        return false;
      }
      let resList;
      try {
        resList = yield call(api.getRePrintInfo, [orderID, packageID]);
        const [orderRes, packageRes] = resList;
        if (orderRes.data.Status === 1000 && packageRes.data.Status === 1000) {
          console.log('重新打印');
          // 2个任务：  1. 重新打印标签  2. 在数据仓库中修改相应包裹的打印记录 
          const user = yield select(state => state.loginInfo.userDetailInfo)
          // const curOrderData = yield select(state => state.packageStore.curPrintDiaInfo)
          const _tempObj = { ...packageRes.data.Data, Printer: {ID: user.StaffID, Name: user.StaffName} }
          yield put({ type: 'changeCurPrintOrderData', payload: orderRes.data.Data});
          yield put({ type: 'changeRePrintData', payload: { orderID, packageData: _tempObj }});
          if (isWindowPrint) {
            setTimeout(() => {
              handlePrint(orderID, packageID);
            }, 100);
          } else {
            handleLodopPrint(_tempObj, orderRes.data.Data, user);
          }
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    *getPrintedList({ payload }, { call, put, select }) { // 获取已打印包裹列表
      // const printedList = yield select(state => state.packageStore.hasPrintedPackageList);
      // if (printedList && printedList.length > 0) return;
      let res;
      try {
        res = yield call(api.getPrintPackageList, payload);
        if (res.data.Status === 1000) {
          // res.data.Data.forEach(it => it.PackageList.reverse());
          const user = yield select(state => state.loginInfo.userDetailInfo);
          const _list = res.data.Data.reverse();
          _list.forEach(it => {
            console.log(it);
            const canList = [];
            const otherList = [];
            const enteredList = [];
            it.PackageList.forEach(it2 => {
              if (it2.Status === 0 && it2.Printer.ID === user.StaffID) canList.push(it2);
              else if (it2.Status === 200) enteredList.push(it2);
              else otherList.push(it2);
            })
            it.PackageList = [...canList, ...otherList, ...enteredList]
          })
          yield put({ type: 'reStoreDataFromStorage', payload: _list });
          // sessionStorage.setItem('printedList', JSON.stringify(_list));
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }

    },
    *searchPackageAtLabelPrintPage({ payload }, { call, put, select }) { // 打印标签页面 搜索包裹
      yield put({ type: 'setPrintLabelSearchResult', payload: { printLabelSearchResult: null } });

      const { KeyWords } = payload;
      const localWords = yield select(state => state.packageStore.printLabelSearchWords);

      if (KeyWords !== localWords) yield put({ type: 'setPrintLabelSearchWords', payload: KeyWords });

      let res;
      try {
        res = yield call(api.getPrintPackageList, payload);
        if (res.data.Status === 1000) {
          // res.data.Data.forEach(it => it.PackageList.reverse());
          // const _list = res.data.Data.reverse();
          // yield put({ type: 'setPrintLabelSearchResult', payload: { printLabelSearchResult: _list } });

          const user = yield select(state => state.loginInfo.userDetailInfo);
          const _list = res.data.Data;
          _list.forEach(it => {
            console.log(it);
            const canList = [];
            const otherList = [];
            const enteredList = [];
            it.PackageList.forEach(it2 => {
              if (it2.Status === 0 && it2.Printer.ID === user.StaffID) canList.push(it2);
              else if (it2.Status === 200) enteredList.push(it2);
              else otherList.push(it2);
            })
            it.PackageList = [...canList, ...otherList, ...enteredList]
          })

          yield put({ type: 'setPrintLabelSearchResult', payload: { printLabelSearchResult: _list } });
          return true;
        }
        return false;
      } catch (error) {
        model.showWarn({ title: '查询失败', msg: error });
        return false;
      }

    },
    *fetchSubmitList({ payload }, { call, put }) {  // 获取提交入库列表
      let res;
      try {
        res = yield call(api.getUnInstoreList, payload);
        if (res.data.Status === 1000) {
          yield put({ type: 'setSubmitList', payload: { ...res.data.Data, DataNumber: res.data.DataNumber } });
          return true;
        }
        return false;
      } catch (error) {
        model.showWarn({ title: '获取提交入库列表失败', msg: error });
        return false;
      }
    },
    *fetchFactoryList({ payload }, { call, put, select }) {
      let FactoryList = yield select(state => state.packageStore.FactoryList);
      if (FactoryList.length > 0) return;
      FactoryList = sessionStorage.getItem('FactoryList');
      if (FactoryList) {
        yield put({ type: 'setFactoryList', payload: JSON.parse(FactoryList) });
        return;
      }
      let res;
      try {
        res = yield call(api.getFactoryList, payload);
        if (res.data.Status === 1000) {
          yield put({ type: 'setFactoryList', payload: res.data.Data });
          sessionStorage.setItem('FactoryList', JSON.stringify(res.data.Data));
          return true;
        }
        return false;
      } catch (error) {
        model.showWarn({ title: '获取工厂列表失败', msg: error });
        return false;
      }
    },
    *fetchOperaLogList({ payload }, { call, select, put }) {
      const { KeyWords } = payload;
      yield put({ type: 'changeCondition4LogList', payload: { KeyWords: KeyWords ? KeyWords : '' } });
      let res;
      try {
        yield put({ type: 'setLogList', payload: { logList: [], DataNumber: 0, Message: 0 } });
        res = yield call(api.getPrintPackageList, payload);
        if (res.data.Status === 1000) {
          yield put({ type: 'setLogList', payload: { logList: res.data.Data, DataNumber: res.data.DataNumber, Message: res.data.Message } });
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
  },
  subscriptions: {
    // reStoreDataFromStorage({ dispatch }) {
    //   const storagePrintedList = sessionStorage.getItem('printedList');
    //   if (storagePrintedList) {
    //     dispatch({ type: 'reStoreDataFromStorage', payload: JSON.parse(storagePrintedList) });
    //   }
    // },
    fetchDataByPath({ dispatch, history }) {
      history.listen(async pathData => {
        console.log(pathData, 'pathData');
        const { pathname } = pathData;
        if (pathname === '/') history.push('/labelprint');
        if (pathname === '/labelprint') {
          dispatch({ type: 'getPrintedList', payload: { UsePrint: true } });
          dispatch({ type: 'setPrintLabelSearchResult', payload: { printLabelSearchResult: null } });
        }
        if (pathname === '/labelprint/search') {
          const { keyword } = pathData.query;
          if (!keyword) return;
          dispatch({ type: 'searchPackageAtLabelPrintPage', payload: { UsePrint: true, KeyWords: keyword  } });
        }
        if (pathname === '/submitware') {
          if (isEmpty(pathData.query)) {
            history.push('?page=1&pageSize=6');
            return;
          }
          const _tempObj = {
            page: 1,
            pageSize: 6,
            ...pathData.query,
          };
          _tempObj.page = +_tempObj.page;
          _tempObj.pageSize = +_tempObj.pageSize;
          if (_tempObj.factoryID) _tempObj.factoryID = +_tempObj.factoryID;
          dispatch({ type: 'changeCondition4SubmitList', payload: _tempObj });
          dispatch({ type: 'fetchFactoryList', payload: {} });
          await dispatch({ type: 'fetchSubmitList', payload: _tempObj });
          const oDom = document.getElementsByClassName('page-common-style-wrap')[0];
          if (oDom && oDom.scrollTo) oDom.scrollTo(0, 0);
        }
        if (pathname === '/operatelog') {
          if (isEmpty(pathData.query)) {
            history.push('?Page=1&PageSize=10&FactoryID=&dateType=today');
            return;
          }
          dispatch({ type: 'fetchFactoryList', payload: {} });
          // const { KeyWords } = pathData.query;
          // const _keyWords = KeyWords ? KeyWords : '';
          const _tempObj = {
            Page: 1,
            PageSize: 10,
            ...pathData.query,
          };
          _tempObj.Page = +_tempObj.Page;
          _tempObj.PageSize = +_tempObj.PageSize;
          if (_tempObj.FactoryID) _tempObj.FactoryID = +_tempObj.FactoryID;
          console.log(_tempObj);
          if (_tempObj.dateType === 'define') {
            setAndFilterDate(_tempObj);
            dispatch({ type: 'changeCondition4LogList', payload: _tempObj });
          } else {
            dispatch({ type: 'changeCondition4LogList', payload: _tempObj });
            setAndFilterDate(_tempObj);
          }
          
          
          _tempObj.IncludeCancled = true;
          // _tempObj.HaveInstored = true;
          _tempObj.UsePrint = false;
          delete _tempObj.dateType;
          await dispatch({ type: 'fetchOperaLogList', payload: _tempObj });
          const oDom = document.getElementsByClassName('page-common-style-wrap')[0];
          if (oDom && oDom.scrollTo) oDom.scrollTo(0, 0);
        }
      })
    }
  }
}