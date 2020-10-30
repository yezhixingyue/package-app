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
};

export default api;
