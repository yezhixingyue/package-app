import model from '@/assets/js/utils/model';
import { connect, history } from 'umi';
import PrintLabelHeader from '../Header/PrintLabelHeader';

const mapStateToProps = (state: { packageStore: { printLabelSearchWords: string; }; }) => {
  return {
    searchWords: state.packageStore.printLabelSearchWords,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | object; }) => any) => {
  return {
    async getPrintPackageOrderInfo(orderId: string, shouldCheck: boolean) {
      if (history.location.pathname !== '/labelprint') {
        history.push('/labelprint');
        dispatch({ type: 'packageStore/setPrintLabelSearchWords', payload: '' })
      }
      const res = await dispatch({ type: 'packageStore/getPrintPackageOrderInfo', payload: orderId });
      if (res && typeof res === 'object') {
        if (shouldCheck) {
          console.log(res.Content);
          model.PrintOrderIDConfirm({
            title: '请确认订单信息是否正确!',
            msg1: `生产工厂：[ ${res.Factory.Name} ]`,
            msg2: `${res.Content}`,
            okText: '确认无误',
            onOk: async () => {
              if (res.UnPrintKindCount === 1) { // 剩余只有1款未打印时， 直接获取打印信息进行打印
                const payload = {
                  OrderID: orderId,
                  IncludeKindCount: 1,
                  curOrderData: res,
                }
                const printRes = await dispatch({ type: 'packageStore/getPrintPackage', payload })
                console.log(printRes); // 打印
              } else  if (res.UnPrintKindCount === 0) { // 剩余未打印款数为0时，更改仓库状态，使其进行弹窗显示
                dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: res, curPrintDiaOnState: true } })
              } else {
                dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: res, curPrintDiaOnState: true } })
              }
            },
          })
          return;
        }
        if (res.UnPrintKindCount === 1) { // 剩余只有1款未打印时， 直接获取打印信息进行打印
          const payload = {
            OrderID: orderId,
            IncludeKindCount: 1,
            curOrderData: res,
          }
          const printRes = await dispatch({ type: 'packageStore/getPrintPackage', payload })
          console.log(printRes); // 打印
        } else  if (res.UnPrintKindCount === 0) { // 剩余未打印款数为0时，更改仓库状态，使其进行弹窗显示
          dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: res, curPrintDiaOnState: true } })
        } else {
          dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: res, curPrintDiaOnState: true } })
        }
      }
    },
    handlePackageSearch(keyword: string) {
      history.push(`/labelprint/search?keyword=${keyword}`);
    },
    setPrintLabelSearchWords(keyword: string) {
      dispatch({ type: 'packageStore/setPrintLabelSearchWords', payload: keyword });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintLabelHeader);