import { connect } from 'umi';
import PageContentComp from '../Content';
import { OrderItemProps } from '@/assets/js/types';

const mapStateToProps = (state: { packageStore: { logResult: { logList: OrderItemProps[]; DataNumber: number; }, condition4LogList: { Page: number, PageSize: number } }; }) => {
  return {
    logList: state.packageStore.logResult.logList,
    DataNumber: state.packageStore.logResult.DataNumber,
    Page: state.packageStore.condition4LogList.Page,
    PageSize: state.packageStore.condition4LogList.PageSize,
  }
}

export default connect(mapStateToProps, null)(PageContentComp);