import { connect } from 'umi';
import PrintModel from '@/components/PrintLabelComps/Model/PrintModel';
import { printInfo, printInfoType } from '@/components/PrintLabelComps/Model/PrintModel';

const mapStateToProps = (state: { packageStore: { curPrintDiaInfo: printInfo; curPrintDiaOnState: boolean; }; }) => {
  return {
    curPrintDiaInfo: state.packageStore.curPrintDiaInfo,
    curPrintDiaOnState: state.packageStore.curPrintDiaOnState,
  }
}



const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    closeModelAndInfo() {
      dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: null, curPrintDiaOnState: false } });
    },
    async getPrintPackage({ OrderID, IncludeKindCount, curOrderData }:printInfoType) {
      const payload = {
        OrderID,
        IncludeKindCount,
        curOrderData,
      }
      console.log(curOrderData, 'curOrderData');
      const printRes = await dispatch({ type: 'packageStore/getPrintPackage', payload })
      console.log(printRes); // 打印
    },
    setModelState(curPrintDiaOnState: boolean) {
      console.log('setModelState', curPrintDiaOnState);
      dispatch({ type: 'packageStore/setModelState', payload: { curPrintDiaOnState } });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintModel);