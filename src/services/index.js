import instance from './axios';

const api = {
  /* 登录注册部分 与 账号相关等 api
  ----------------------------------------------------------------------------------- */
  getLogin(data) { // POST /Api/Staff/Login
    return instance.post('/Api/Staff/Login', data);
  },
  getStaffDetail() { // 获取当前登录用户信息详情  POST /Api/Staff/Detail
    return instance.post('/Api/Staff/Detail');
  },

  /* 打印标签 部分 api
  ----------------------------------------------------------------------------------- */
  getPrintPackageOrderInfo(orderID) {  // GET /Api/PrintPackage/OrderInfo  获取打印包裹标签订单信息
    return instance.get(`/Api/PrintPackage/OrderInfo?orderID=${orderID}`);
  },
  getPrintPackage(data) { // POST /Api/PrintPackage 打印包裹标签
    return instance.post('/Api/PrintPackage', data);
  },
  ReprintPackage(packageID) { // PUT /Api/PrintPackage/Reprint  包裹重打
    return instance.put(`/Api/PrintPackage/Reprint?packageID=${packageID}`);
  },
  getModifyKindChange({ packageID, includeKind }) { // PUT /Api/PrintPackage/ModifyKind 款数修改
    return instance.put(`/Api/PrintPackage/ModifyKind?packageID=${packageID}&includeKind=${includeKind}`);
  },
  getPrintPackageCancle(packageID) { // DELETE /Api/PrintPackage/Cancle   包裹撤销
    return instance.delete(`/Api/PrintPackage/Cancle?packageID=${packageID}`);
  },
  getPrintPackageList(data) { // POST /Api/PrintPackage/List 获取打印包裹号标签(未入库)列表
    return instance.post('/Api/PrintPackage/List', data);
  },
  getUnInstoreList({ factoryID, page, pageSize }) { // GET /Api/UnInstoreList/List 获取未入库包裹标签列表  提交使用
    let _query = '';
    if (factoryID) _query += `factoryID=${factoryID}`;
    if (page) _query = _query.length > 0 ? _query + `&page=${page}` : `page=${page}`;
    if (pageSize) _query = _query.length > 0 ? _query + `&pageSize=${pageSize}` : `pageSize=${pageSize}`;
    return instance.get(`/Api/UnInstoreList/List?${_query}`);
  },
  getFactoryList() { // /Api/Constant/VersionValid 获取工厂信息
    return instance.post('/Api/Constant/VersionValid', { key: 1 });
  },
  getPrintPackageInStore(data) { // POST /Api/PrintPackage/InStore 提交入库
    return instance.post('/Api/PrintPackage/InStore', data);
  },
  // POST /Api/PrintPackage/Excel   导出操作记录列表为Excel表格
  getPrintPackageExcel(data) {
    return instance.post('/Api/PrintPackage/Excel', data);
  },
};

export default api;
