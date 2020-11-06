import { connect, history } from 'umi';
import LabelPrintPageSearchIndex from '@/components/PrintLabelComps/Search/index2';
import { OrderItemProps, PackageItemProps } from '@/components/PrintLabelComps/container/PrintContentContainer';

import React from 'react'

function index() {
  return (
    <div>
      sdasd
    </div>
  )
}


const mapStateToProps = (state: { packageStore: { printLabelSearchResult: null | OrderItemProps[] }; }) => {
  return {
    searchList: state.packageStore.printLabelSearchResult,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string; }) => void) => {
  return {
    jumpToListPage() {
      history.push('/labelprint');
      dispatch({ type: 'packageStore/setPrintLabelSearchWords', payload: '' });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelPrintPageSearchIndex);
