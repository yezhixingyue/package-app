const markList = [
  'ubrowser', // UC
  'taobrowser', // 淘宝
  'lbbrowser', // 猎豹
  'qqbrowser', // QQ
  'maxthon', // 遨游
  'bidubrowser', // 百度
  'edge',
  'opr/'
];

const mimeTypeList = [
  'application/vnd.chromium.remoting-viewer', // 360
  'application/sogou-native-widget-plugin', // 搜狗
  'application/360softmgrplugin',
]

function hasOtherMark(ua: string) {
  let flag = false;
  markList.forEach(it => {
    if (ua.indexOf(it) !== -1) {
      if (flag) return;
      flag = true;
    }
  })
  return flag;
}

function isInMimeList(mimeTypes: MimeTypeArray) {
  var flag = false;
  while (mimeTypeList.length) {
      if (flag) {
          return flag;
      }
      const mimeType = mimeTypeList.pop();
      for (let index = 0; index < mimeTypes.length; index++) {
        const item = mimeTypes[index];
        console.log(item.type.toLowerCase(), mimeType)
        if (item.type.toLowerCase() === mimeType) {
          console.log(true)
          flag = true;
          return flag;
        }
      }
  }
  console.log(flag)
  return flag;
}


export default function isChrome() {
  const ua = navigator.userAgent.toLowerCase();
  const mimeTypes: MimeTypeArray = navigator.mimeTypes;
  return (ua.indexOf('chrome') !== -1)
      && !hasOtherMark(ua)
      && !isInMimeList(mimeTypes);
}
