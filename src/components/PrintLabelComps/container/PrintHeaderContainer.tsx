import { connect } from 'umi';
import PrintLabelHeader from '../Header/PrintLabelHeader';


const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | object; }) => any) => {
  return {
    async getPrintPackageOrderInfo(orderId: string) {
      const res = await dispatch({ type: 'packageStore/getPrintPackageOrderInfo', payload: orderId });
      if (res && typeof res === 'object') {
        console.log(res, 'dispatch container', res.UnPrintKindCount);
        if (res.UnPrintKindCount === 1) { // 剩余只有1款未打印时， 直接获取打印信息进行打印
          const payload = {
            OrderID: orderId,
            IncludeKindCount: 1,
          }
          const printRes = await dispatch({ type: 'packageStore/getPrintPackage', payload })
          console.log(printRes); // 打印
        } 
        if (res.UnPrintKindCount === 0) { // 剩余未打印款数为0时，更改仓库状态，使其进行弹窗显示
          dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: res, curPrintDiaOnState: true } })
        }
      }
    }
  }
}

export default connect(null, mapDispatchToProps)(PrintLabelHeader);