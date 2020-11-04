

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

export default {
  formartDate
}