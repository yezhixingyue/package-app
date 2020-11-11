import { ConvertTimeFormat } from './ConvertTimeFormat';

function AlltimeDate() {
  return {
    First: '',
    Second: '',
  };
};

function TodayDate(state) {
  const stringDate = ConvertTimeFormat(new Date());
  return {
    First: `${stringDate}T00:00:00.000Z`,
    Second: `${stringDate}T23:59:59.997Z`,
  };
};

function  YesterdayDate(state) {
  const stringDate = ConvertTimeFormat(
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
  );
  return {
    First: `${stringDate}T00:00:00.000Z`,
    Second: `${stringDate}T23:59:59.997Z`,
  };
};

function  BeforeYesterdayTimeDate(state) {
  const stringDate = ConvertTimeFormat(
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
  );
  return {
    First: `${stringDate}T00:00:00.000Z`,
    Second: `${stringDate}T23:59:59.997Z`,
  };
};
// new Date(new Date().getTime()  - new Date().getDay() * 24 * 60 * 60 * 1000)
// new Date(new Date().getTime()  - new Date().getDay() * 24 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000)

function  curMonthDate(state) {
  const stringDate1 = ConvertTimeFormat(new Date(new Date().setDate(1)));
  const m = new Date().getMonth();
  const t = new Date(new Date(new Date().setMonth(m + 1)).setDate(0));
  const stringDate2 = ConvertTimeFormat(new Date(t));
  return {
    First: `${stringDate1}T00:00:00.000Z`,
    Second: `${stringDate2}T23:59:59.997Z`,
  };
};

function  lastMonthDate(state) {
  const stringDate1 = ConvertTimeFormat(new Date(
    new Date(
      new Date().setDate(1),
    ).setMonth(new Date().getMonth() - 1),
  ));
  const stringDate2 = ConvertTimeFormat(new Date(new Date().setDate(0)));
  return {
    First: `${stringDate1}T00:00:00.000Z`,
    Second: `${stringDate2}T23:59:59.997Z`,
  };
}


export default {
  AlltimeDate,
  TodayDate,
  YesterdayDate,
  BeforeYesterdayTimeDate,
  curMonthDate,
  lastMonthDate,
}