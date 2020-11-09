import { connect } from 'umi';
import { submitResultType, condition4SubmitListType } from '@/assets/js/types';

import SubmitPageHeader from '../SubmitPageHeader'

interface Factory {
  FactoryID: string,
  FactoryName: string,
}

const mapStateToProps = (state: { packageStore: { submitResult: submitResultType; condition4SubmitList: condition4SubmitListType, FactoryList: Factory[] }; }) => {
  return {
    FinishOrderCount: state.packageStore.submitResult.FinishOrderCount,
    PackageCount: state.packageStore.submitResult.PackageCount,
    UnFinishOrderCount: state.packageStore.submitResult.UnFinishOrderCount,
    factoryID: state.packageStore.condition4SubmitList.factoryID,
    FactoryList: state.packageStore.FactoryList,
  }
}


export default connect(mapStateToProps, null)(SubmitPageHeader);