import PrintLabelContentModel from '../PageContent/PrintLabel/PrintLabelContentModel';
import model from '@/assets/js/utils/model';
import { connect } from 'umi';

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { packageID: number; includeKind?: number, orderID: number}; }) => any) => {
  return {
    async ReprintPackage(packageID: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/ReprintPackage', payload: { packageID, orderID } });
      if (res) {
        callback()
        // setTimeout(() => {
        //   model.showSuccess({ title: `重新打印成功`, msg: `包裹号：[ ${packageID} ]` })
        // }, 150)
        // model.showSuccess({ title: `重新打印成功`, msg: `包裹号：[ ${packageID} ]`, onOk: () => callback() })
      }
    },
    async getPrintPackageCancle(packageID: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/getPrintPackageCancle', payload: { packageID, orderID } });
      if (res) {
        callback()
        setTimeout(() => {
          model.showSuccess({ title: `撤销成功`, msg: `包裹号：[ ${packageID} ]` })
        }, 150)
        // model.showSuccess({ title: `撤销成功`, msg: `包裹号：[ ${packageID} ]`, onOk: () => callback() })
      }
    },
    async getModifyKindChange(packageID: number, includeKind: number, callback: () => void, orderID: number) {
      const res = await dispatch({ type: 'packageStore/getModifyKindChange', payload: { packageID, includeKind, orderID } });
      if (res) {
        callback()
        setTimeout(() => {
          model.showSuccess({ title: '款数更改成功', msg: `包裹号：[ ${packageID} ]，更改后款数为${includeKind}` })
        }, 150)
        // model.showSuccess({ title: '款数更改成功', msg: `包裹号：[ ${packageID} ]，更改后款数为${includeKind}`, onOk: () => callback() })
      }
    },
  }
}

export default connect(null, mapDispatchToProps)(PrintLabelContentModel);