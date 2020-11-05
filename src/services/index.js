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
};

export default api;
