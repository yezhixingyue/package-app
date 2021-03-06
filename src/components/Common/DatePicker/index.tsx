// import { Dayjs } from 'dayjs';
// import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
// import generatePicker from 'antd/es/date-picker/generatePicker';
// import 'antd/es/date-picker/style/index';
// // import dayjs from 'dayjs'
// // import 'dayjs/locale/zh-cn'
// // dayjs.locale('zh-cn')

// const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

// export default DatePicker;


import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;