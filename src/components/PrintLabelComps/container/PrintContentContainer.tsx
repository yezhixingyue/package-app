import { connect } from 'umi';
import PrintLabelContent from '../PageContent/PrintLabelContent';

interface PrintRecordsItemProps {
  PackageID: number,
  PrintTime: string,
}


interface PackageItemProps {
  PackageID: number,
  IncludeKindCount: number,
  PrintRecords: PrintRecordsItemProps[],
  LastPrintTime: string,
  OrderID: number,
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
  }
}

const mapStateToProps = (state:iState) => {
  return {
    hasPrintedPackageList: state.packageStore.hasPrintedPackageList,
  }
}

export default connect(mapStateToProps, null)(PrintLabelContent);