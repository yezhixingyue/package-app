import axios from 'axios';
import { history } from 'umi';
import model from '../assets/js/utils/model';
import { message } from 'antd';

let loadingInstance;
let closeTip = false;
let closeLoading = false;
axios.interceptors.request.use(
  (config) => {
    const curConfig = config;
    const loginAuth = sessionStorage.getItem('loginAuth');
    closeTip = curConfig.closeTip;
    closeLoading = curConfig.closeLoading;
    const url = curConfig.url.split('?')[0];
    const arrWithOutToken = ['/Api/Customer/Reg', '/Api/Customer/Login'];
    if (loginAuth && !arrWithOutToken.includes(url)) {
      // console.log(loginAuth, 'loginAuthloginAuthloginAuth');
      curConfig.headers.common.Authorization = `Bearer ${loginAuth}`;
    }
    // console.log(loginAuth, 'loginAuthloginAuthloginAuth');
    let key = true;
    const arr = ['/Api/Order/Create', '/Api/PaymentOrder/PayResult', '/Api/Upload/File']; // 不需要展示loading的api地址
    for (let i = 0; i < arr.length; i += 1) {
      if (curConfig.url.includes(arr[i])) {
        key = false;
      }
    }
    if (key && !closeLoading) {
      // loadingInstance = Loading.service({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(255, 255, 255, 0.3)',
      //   customClass: 'mp-general-loading-box',
      // });
    }
    return curConfig;
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    model.showWarn({ msg: error });
    // alert(error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();
    const _list2NotNeed2Toast = ['/Api/PrintPackage/Excel'];
    const _statusList2NotNeed2Toast = [1000, 9062, 9169];
    // 包含以上的状态码 或 以上的请求路径  不会弹窗报错  其余以外都会报错出来

    const _url = response.config.url.split('?')[0];

    if ([7025, 8037].includes(response.data.Status)) {
      message.error(response.data.Message);
      history.replace('/login');
      sessionStorage.removeItem('loginAuth');
      return response;
    } if ((!_statusList2NotNeed2Toast.includes(response.data.Status) && !_list2NotNeed2Toast.includes(_url) && (!closeTip)) || [7025, 8037].includes(response.data.Status)) {
      const _obj = { msg: `[ ${response.data.Message} ]` };
      if ([7025, 8037].includes(response.data.Status)) {
        _obj.onOk = () => {
          history.replace('/login');
          sessionStorage.removeItem('loginAuth');
        };
      } else {
        _obj.onOk = undefined;
      }
      let _msg = '错误';
      if (_url === '/Api/Staff/Login') _msg = '登录失败';
      if (_url === '/Api/Staff/Detail') _msg = '获取用户信息失败';
      if (_url === '/Api/PrintPackage/OrderInfo') _msg = '打印失败';
      if (_url === '/Api/PrintPackage/List') _msg = '获取或查询列表失败';
      if (_url === '/Api/PrintPackage/InStore') _msg = '提交失败';

      _obj.title = _msg;
      model.showWarn(_obj);
      // alert(_msg);
    }
    return response;
  },
  async (error) => {
    if (loadingInstance) loadingInstance.close();
    if (error.response) {
      let key = false;
      let b;
      let r;
      let buffterRes;
      let buffterErr = '文件导出数据过大，请缩小导出时间区间或精确筛选条件';

      // console.log(error.response);
      const _url = error.response.config.url.split('?')[0];
      let _msg = '错误';
      if (_url === '/Api/Staff/Login') _msg = '登录失败';
      if (_url === '/Api/Staff/Detail') _msg = '获取用户信息失败';
      if (_url === '/Api/PrintPackage/OrderInfo') _msg = '打印失败';
      if (_url === '/Api/PrintPackage/List') _msg = '获取数据失败';
      if (_url === '/Api/PrintPackage/InStore') _msg = '提交失败';
      console.log(_msg);
      switch (error.response.status) {
        case 401:
          history.replace('/login');
          sessionStorage.removeItem('loginAuth');
          key = true;
          break;
        case 413: // 处理文件导出错误
          b = new Blob([error.response.data]);
          r = new FileReader();
          r.readAsText(b, 'utf-8');
          buffterRes = await new Promise(resolve => { r.onload = res => resolve(res); });
          if (buffterRes && buffterRes.currentTarget && buffterRes.currentTarget.result) {
            buffterErr = buffterRes.currentTarget.result;
          }
          model.showWarn({ title: _msg, msg: `[ 错误 413：${buffterErr} ]` });
          // alert(`错误 413：${buffterErr}`);
          key = true;
          break;
        default:
          model.showWarn({ title: _msg, msg: `[ 错误代码${error.response.status}：${error.response.statusText}]` });
          // alert(`[ 错误代码${error.response.status}：${error.response.statusText}]`);
          key = true;
          break;
      }
      if (key) return Promise.reject(error.response);
    }
    if (error.message === 'Network Error') {
      // Message({
      //   showClose: true,
      //   message: '网络错误',
      //   type: 'error',
      // });
      message.error('网络错误');
    } else if (error.message.includes('timeout')) {
      // Message({
      //   showClose: true,
      //   message: '网络超时',
      //   type: 'error',
      // });
      message.error('网络超时');
    } else if (error.response && error.response.status === 404) {
      // Message({
      //   showClose: true,
      //   message: '404错误',
      //   type: 'error',
      // });
      message.error('404');
    } else {
      let msg = '未知错误';
      if (error.response && error.response.data && error.response.data.Message) {
        msg = error.response.data.Message;
      }
      // console.log(error, error.response);
      // Message({
      //   showClose: true,
      //   message: msg,
      //   type: 'error',
      // });
      message.error(msg);
    }
    return Promise.reject(error);
  },
);

export default axios;
