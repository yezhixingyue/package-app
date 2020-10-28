/*
 * @Author: your name
 * @Date: 2020-04-13 09:21:56
 * @LastEditTime: 2020-05-26 09:07:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \orderList\src\assets\js\validator\validateCheck.js
 */
import Validator from '@/assets/js/validator/vueValidator'; // 策略模式引入

/**
 *
 *
 * @param {*} value 传入需要校验的值
 * @param {*} rules 需要校验的规则
 * @returns 返回校验结果：true或错误信息
 */
function validateFunc(value, rules) {
  // 策咯模式函数1
  const validator = new Validator();
  validator.add(value, rules);
  const errorMsg = validator.start(); // 获得效验结果
  return errorMsg; // 返回效验结果
}

/**
 *
 *
 * @param {*} value 传入需要校验的值
 * @param {*} rules 需要校验的规则
 * @param {*} cb    回调函数
 * @returns     如果没有报错信息则返回true，如果有报错则把报错信息作为参数执行回调函数
 */
function validateCheck(value, rules, cb) {
  // 策咯模式函数2
  // console.log(value, rules, cb);
  const checkMsg = validateFunc(value, rules);
  if (checkMsg !== true) {
    cb(checkMsg);
    return false;
  }
  return checkMsg;
}

export default validateCheck;

// 注：
// 进一步封装 只向外暴露出一个方法 需要接收三个参数：1.需要接受校验的值 2.校验的规则与错误信息(数组) 3.对错误信息处理的回调函数
// 如：
// //策咯模式验证手机号码
// const phoneRules = [
//   { strategy: "isNotEmpty", errorMsg: "手机号码不能为空" },
//   { strategy: "shouldLength:11", errorMsg: "手机号码长度不正确" },
//   { strategy: "isPhone", errorMsg: "手机号码格式不正确" }
// ];
// if (!validateCheck(_loginObj.Mobile, phoneRules, this.setErrMsg)) return;
// //策咯模式验证密码
// const pwdRules = [
//   { strategy: "isNotEmpty", errorMsg: "密码不能为空" },
//   { strategy: "minLength:6", errorMsg: "密码长度不能小于6位" },
//   { strategy: "maxLength:16", errorMsg: "密码长度不能大于16位" }
// ];
// if (!validateCheck(_loginObj.Password, pwdRules, this.setErrMsg)) return;
