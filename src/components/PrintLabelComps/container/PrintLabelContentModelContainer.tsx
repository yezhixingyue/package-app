import PrintLabelContentModel from '../PageContent/PrintLabel/PrintLabelContentModel';
import model from '@/assets/js/utils/model';
import { connect } from 'umi';

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { packageID: number; includeKind?: number, orderID: number}; }) => any) => {
  return {
    async ReprintPackage(packageID: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/ReprintPackage', payload: { packageID, orderID } });
      if (res) {
        callback()
        setTimeout(() => {
          model.showSuccess({ title: '重新打印成功'})
        }, 150)
      }
    },
    async getPrintPackageCancle(packageID: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/getPrintPackageCancle', payload: { packageID, orderID } });
      if (res) {
        callback()
        setTimeout(() => {
          model.showSuccess({ title: '撤销成功'})
        }, 150)
      }
    },
    async getModifyKindChange(packageID: number, includeKind: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/getModifyKindChange', payload: { packageID, includeKind, orderID } });
      if (res) {
        callback()
        setTimeout(() => {
          model.showSuccess({ title: '更改款数成功'})
        }, 150)
      }
    },
  }
}

export default connect(null, mapDispatchToProps)(PrintLabelContentModel);