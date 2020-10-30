import { connect } from 'umi';
import PrintModel from '@/components/PrintLabelComps/Model/PrintModel';

const mapStateToProps = (state: { packageStore: { curPrintDiaInfo: object; curPrintDiaOnState: boolean; }; }) => {
  return {
    curPrintDiaInfo: state.packageStore.curPrintDiaInfo,
    curPrintDiaOnState: state.packageStore.curPrintDiaOnState,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { curPrintDiaInfo: null; curPrintDiaOnState: boolean; }; }) => void) => {
  return {
    closeModelAndInfo() {
      dispatch({ type: 'packageStore/setCurPrintInfo', payload: { curPrintDiaInfo: null, curPrintDiaOnState: false } });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintModel);