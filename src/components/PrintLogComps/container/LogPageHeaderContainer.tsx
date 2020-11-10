import { connect } from 'umi';
import PageHeaderComp from '../Header';

interface Factory {
  FactoryID: string,
  FactoryName: string,
}

const mapStateToProps = (state: { packageStore: { condition4LogList: { FactoryID: number, KeyWords: string }; FactoryList: Factory[]; }; }) => {
  return {
    FactoryID: state.packageStore.condition4LogList.FactoryID,
    FactoryList: state.packageStore.FactoryList,
    KeyWords: state.packageStore.condition4LogList.KeyWords,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { KeyWords?: string, oldKeyWords?: string }; }) => void) => {
  return {
    changeKeywords: (val: string) => {
      dispatch({ type: 'packageStore/changeCondition4LogList', payload: { KeyWords: val } })
    },
    changeOldKeywords: (val: string) => {
      dispatch({ type: 'packageStore/changeCondition4LogList', payload: { oldKeyWords: val } })
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderComp);