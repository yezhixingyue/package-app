import { connect } from 'umi';
import PageHeaderComp from '../Header';

interface Factory {
  FactoryID: string,
  FactoryName: string,
}
interface PrintTimeType {
  First: string,
  Second: string,
}

const mapStateToProps = (state: { packageStore: { condition4LogList: { FactoryID: number, KeyWords: string, dateType: string, PrintTime: PrintTimeType }; FactoryList: Factory[]; }; }) => {
  return {
    FactoryID: state.packageStore.condition4LogList.FactoryID,
    FactoryList: state.packageStore.FactoryList,
    KeyWords: state.packageStore.condition4LogList.KeyWords,
    dataType: state.packageStore.condition4LogList.dateType,
    dateObj: state.packageStore.condition4LogList.PrintTime,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { KeyWords?: string, oldKeyWords?: string, PrintTime?: object }; }) => void) => {
  return {
    changeKeywords: (val: string) => {
      dispatch({ type: 'packageStore/changeCondition4LogList', payload: { KeyWords: val } })
    },
    changeOldKeywords: (val: string) => {
      dispatch({ type: 'packageStore/changeCondition4LogList', payload: { oldKeyWords: val } })
    },
    changePrintTime: (val: object) => {
      dispatch({ type: 'packageStore/changeCondition4LogList', payload: { PrintTime: val } })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderComp);