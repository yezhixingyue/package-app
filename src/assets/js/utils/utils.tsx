

 /**
 * 转换时间格式  "2020-11-04T11:05:49.1600263+08:00"  =>  2020-11-04 11:05:49
 *
 * @param {string} date
 * @returns
 */
export const formartDate = (date:string) => {
  if (!date) return '';
  const _arr = date.split('T');
  const [t1, t2s] = _arr;
  const t2 = t2s.split('.')[0];
  return `${t1}  ${t2}`;
};

/**
 * 判断是否为空对象
 *
 * @param {object} obj 需要被验证的对象
 * @returns
 */
export const isEmpty = (obj: object) => {
  return  !Object.getOwnPropertyNames(obj).length &&  !Object.getOwnPropertySymbols(obj).length;
}


export default {
  formartDate,
  isEmpty,
}