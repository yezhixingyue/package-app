import { connect } from 'umi';
import { submitResultType, condition4SubmitListType } from '@/assets/js/types';
import SubmitOrderList from '../SubmitOrderList'


const mapStateToProps = (state: { packageStore: { submitResult: submitResultType, condition4SubmitList: condition4SubmitListType }; }) => {
  return {
    submitList: state.packageStore.submitResult.OrderList,
    FinishOrderCount: state.packageStore.submitResult.FinishOrderCount,
    PackageCount: state.packageStore.submitResult.PackageCount,
    UnFinishOrderCount: state.packageStore.submitResult.UnFinishOrderCount,
    page: state.packageStore.condition4SubmitList.page,
    pageSize: state.packageStore.condition4SubmitList.pageSize,
    DataNumber: state.packageStore.submitResult.DataNumber,
    factoryID: state.packageStore.condition4SubmitList.factoryID,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any[]; }) => void) => {
  return {
    clearPrintedListAfterSubmitSuccess() {
      dispatch({ type: 'packageStore/reStoreDataFromStorage', payload: [] })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrderList);