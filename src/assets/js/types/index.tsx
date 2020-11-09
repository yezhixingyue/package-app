interface PrintRecordsItemProps {
  PackageID: number,
  PrintTime: string,
}

/**
 * 单个包裹数据类型
 *
 * @export
 * @interface PackageItemProps
 */
export interface PackageItemProps {
  PackageID: number,
  IncludeKindCount: number,
  PrintRecords: PrintRecordsItemProps[],
  LastPrintTime: string,
  OrderID: number,
  Status: number,
  Printer: {
    ID: string,
    Name: string,
  }
}

/**
 * 请求到的单个订单数据类型
 *
 * @export
 * @interface OrderItemProps
 */
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


/**
 * 提交入库获取到的结果类型
 *
 * @export
 * @interface submitResultType
 */
export interface submitResultType {
  DataNumber: number,
  UnFinishOrderCount: number,
  PackageCount: number,
  FinishOrderCount: number,
  OrderList: OrderItemProps[],
}

/**
 * 请求提交入库列表的条件对象类型
 *
 * @export
 * @interface condition4SubmitListType
 */
export interface condition4SubmitListType {
  page: number,
  pageSize: number,
  factoryID: number,
}
