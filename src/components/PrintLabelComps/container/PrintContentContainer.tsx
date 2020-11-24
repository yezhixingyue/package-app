import { connect } from 'umi';
import PrintLabelContent from '../PageContent/PrintLabel/PrintLabelContent';

interface PrintRecordsItemProps {
  PackageID: number,
  PrintTime: string,
}


export interface PackageItemProps {
  PackageID: number,
  IncludeKindCount: number,
  PrintRecords: PrintRecordsItemProps[],
  LastPrintTime: string,
  OrderID: number,
  Status: number,
  Printer: {
    ID: string,
  }
}

export interface OrderItemProps {
  OrderID: number,
  Factory: {
    ID: number,
    Name: string,
  },
  KindCount: number,
  ProductAmount: number,
  Unit: string,
  Content: string,
  CustomerSN: string,
  CustomerName: string,
  ProductName: string,
  IncludeKindCount: number,
  ProductClass: {
    First: string,
    Second: string,
  },
  UnPrintKindCount: number,
  PackageList: PackageItemProps[],
}


interface iState {
  packageStore: {
    hasPrintedPackageList: OrderItemProps[],
  },
  loginInfo: {
    userDetailInfo: {
      StaffID: string,
      StaffName: string,
    } | null
  }
}

const mapStateToProps = (state:iState) => {
  return {
    hasPrintedPackageList: state.packageStore.hasPrintedPackageList,
    user: state.loginInfo.userDetailInfo,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: {}; }) => void) => {
  return {
    getPrintedList() {
      dispatch({ type: 'packageStore/getPrintedList', payload: {} });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintLabelContent);