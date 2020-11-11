import model from '@/assets/js/utils/model';
import { ConvertTimeFormat } from '@/assets/js/date/ConvertTimeFormat.js';
import getDate from '@/assets/js/date';


export default async function downLoadExcel(func: (arg0: any) => any, requestObj: any) {
  const res = await func(requestObj);

  // console.log(res, config);
  if (res.status !== 200) {
    model.showWarn({ title: '导出失败', msg: `[ 失败原因：${res.statusText} ]` });
    return;
  }
  const { data } = res;
  const blobData = new Blob([data]);
  const _d = ConvertTimeFormat(new Date());
  let fileName = `打印包裹操作记录(截止至${_d}日).xls`;
  if (requestObj.PrintTime) {
    const { First, Second } = requestObj.PrintTime;
    if (First && Second) {
      const f = First.split('T')[0];
      let _second = '';
      if (new Date(Second) > new Date()) {
        const PlaceDate = getDate.TodayDate();
        _second = PlaceDate.Second;
      } else {
        _second = Second;
      }
      const t2 = _second ? ConvertTimeFormat(new Date(new Date(_second).getTime() - 24 * 60 * 60 * 1000)) : '';
      if (f) fileName = `打印包裹操作记录(${f}至${t2}).xls`;
    }
  }

  const url = window.URL.createObjectURL(blobData, { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;

    link.setAttribute('download', `${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    link.onload = () => {
      window.URL.revokeObjectURL(url);
    };
  // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //   window.navigator.msSaveOrOpenBlob(blobData, fileName);
  // } else {
  //   const url = window.URL.createObjectURL(blobData, { type: 'application/vnd.ms-excel' });
  //   const link = document.createElement('a');
  //   link.style.display = 'none';
  //   link.href = url;

  //   link.setAttribute('download', `${fileName}`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   link.onload = () => {
  //     window.URL.revokeObjectURL(url);
  //   };
  // }
}