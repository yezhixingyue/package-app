/**
 * 时间格式转换函数
 *
 * @param {*} date 传入new Date()或同类型时间参数  如："Sat Jan 11 2020 16:01:46 GMT+0800 (中国标准时间)"
 * @returns 返回转换后的时间格式："2020-01-11"
 */
export function ConvertTimeFormat(date) {
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const strDate = (`0${date.getDate()}`).slice(-2);
  const currentdate = `${date.getFullYear()}-${month}-${strDate}`;
  return currentdate;
}

/**
 * 传入一个时间，获取其第二天的时间并转换其时间格式
 *
 * @export
 * @param {*} data
 * @returns 返回第二天时间，格式类型："2020-01-12"
 */
export function getSecondTime(data) {
  return ConvertTimeFormat(new Date(data.getTime() + 1000 * 60 * 60 * 24));
}
