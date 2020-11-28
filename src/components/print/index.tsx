import React from "react";
import ReactToPrint from "react-to-print";
import styles from './index.less';
import { connect } from 'umi';
import { formartDate } from '@/assets/js/utils/utils';
import QRCode from 'qrcode.react';

let oInp = document.querySelector('li.mp-print-label-header-inp-wrap > input');

class ComponentToPrint extends React.Component {

  render() {
    if (!this.props.orderData || !this.props.packageDate || !this.props.userInfo) {
      return <ul style={{paddingTop: '5pt', fontSize: '20pt'}}>
        <li>打印出现问题，数据获取失败</li>
        <li>当前订单ID： {this.props.orderData ? this.props.orderData.OrderID : '未获取到订单信息'}</li>
        <li>当前包裹ID： {this.props.packageDate ? this.props.packageDate.PackageID : '未获取到包裹信息'}</li>
        <li></li>
      </ul>;
    }
    const { Consignee, Mobile, AddressDetail, ExpressArea } = this.props.orderData.Address.Address;
    const { RegionalName, CityName, CountyName } = ExpressArea;
    const address = `${RegionalName}${CityName}${CountyName}${AddressDetail}`;
    const { ProductName, ProductClass, SizeString, ProductAmount, Content, KindCount, Unit } = this.props.orderData;
    const LastPrintTime = formartDate(this.props.packageDate.LastPrintTime);
    const Code = <QRCode value={`${this.props.packageDate.PackageID}`} size={245} />
    return (
      <section className={styles.printWrap} style={{width: '210mm', height: '270mm', padding: 0, paddingTop: '4mm', overflow: 'hidden', margin: 0, boxSizing: 'border-box', textShadow: '0.01em 0.01em 0.1em #999999 !important'}}>
        <div style={{width: '195mm', margin: '0 auto', border: '1pt solid #000'}}>
          {/* 上面双竖列部分 */}
          <div style={{display: 'flex', textAlign: 'center'}}>
            <ul style={{width: 'calc(126mm - 1pt)'}}>
              <li style={{fontSize: '90pt', borderRight: '1pt solid #000', borderBottom: '1pt solid #000', height: '30mm', lineHeight: '27mm'}}>{this.props.orderData.Address.Delivery.StationSN}</li>
              <li style={{paddingLeft: '3mm' ,fontSize: '36pt', borderRight: '1pt solid #000', borderBottom: '1pt solid #000', height: '24mm', lineHeight: '21mm', overflow: 'hidden',textAlign: 'left'}}>
                {this.props.orderData.Address.Delivery.StationName} - {this.props.orderData.Address.Delivery.DistrictSN}
              </li>
              <li style={{paddingLeft: '3mm' ,fontSize: '30pt', borderRight: '1pt solid #000', borderBottom: '1pt solid #000', height: '21mm', lineHeight: '21mm', textAlign: 'left'}}>
                {this.props.orderData.CustomerSN}
              </li>
              <li style={{paddingLeft: '3mm' ,fontSize: '30pt', borderRight: '1pt solid #000', borderBottom: '1pt solid #000', height: '27mm', lineHeight: '24mm', textAlign: 'left'}}>{this.props.orderData.CustomerName}</li>
            </ul>
            <div style={{borderBottom: '1pt solid #000', width: 'calc(69mm - 1pt)'}}>
              <div style={{paddingTop: '3pt'}}>
                {/* <img src="../../assets/images/testcode.png" alt=""  /> */}
                {/* <div className={styles.img} style={{width: '66mm', height: '66mm'}}></div> */}
                {Code}
                <p style={{fontSize: '22pt', height: '18mm', lineHeight: '18mm'}}>{this.props.packageDate.PackageID}</p>
              </div>
              <p style={{backgroundColor: '#000', fontSize: '33pt',color: '#fff', height: '17mm', lineHeight: '17mm'}}>{this.props.orderData.Address.ExpressText}</p>
            </div>
          </div>
          {/* 下面单竖列部分 */}
          <ul>
            <li style={{paddingLeft: '3mm', fontSize: '30pt', borderRight: '1pt solid #000', borderBottom: '1pt solid #000', height: '21mm', lineHeight: '21mm'}}>
              <span>{Consignee}</span>
              <span style={{paddingLeft: '1mm', marginLeft: '4px'}}> {Mobile}</span>
            </li>
            <li style={{height: '48mm', paddingTop: '1mm', paddingLeft: '1mm', lineHeight: '15mm', fontSize: '27pt', fontWeight: 'lighter', overflow: 'hidden'}}>
              <span>收件地址：</span><span>{address}</span>
            </li>
            <li style={{height: '33mm', borderBottom: '1pt solid #000', borderTop: '1pt solid #000', lineHeight: '15mm', display: 'flex', textAlign: 'center', paddingTop: '0.5mm'}}>
              <div style={{width: '30mm', fontSize: '30pt'}}>
                <p style={{ textAlign: 'center'}}>检</p>
                <p>{this.props.userInfo.No}</p>
              </div>
              <div style={{backgroundColor: '#000', color: '#fff', fontSize: '33pt', width: '24mm', marginTop: '-1mm', paddingTop: '2mm'}}>
                <p>产</p><p>品</p>
              </div>
              <div style={{flex: '0 0 auto', width: '138mm', textAlign: 'left', paddingLeft: '3mm'}}>
                <p style={{lineHeight: '16.5mm', fontSize: '27pt', whiteSpace: 'nowrap', overflow: 'hidden'}}>{ProductClass.Second} - {ProductName}</p>
                <p style={{lineHeight: '13.5mm', fontSize: '21pt', whiteSpace: 'nowrap', overflow: 'hidden'}}>{KindCount}款 - {ProductAmount}{Unit} - {SizeString}</p>
              </div>
            </li>
            <li style={{height: '57mm', paddingTop: '3mm', paddingLeft: '3mm' ,textAlign: 'left'}}>
              <div style={{height: '30mm', lineHeight: '15mm', fontSize: '27pt', overflow: 'hidden'}}>
                备注：{Content}
              </div>
              <div style={{height: '24mm', lineHeight: '12mm', fontSize: '18pt', overflow: 'hidden'}}>
                保留此包裹时,代表您已签收并确认产品信息。
                <p>打印时间{LastPrintTime}</p>
              </div>
            </li>
          </ul>
        </div>

      </section>
    );
  }
}

class Example extends React.Component {
  componentRef!: ComponentToPrint | null;
  render() {
    return (
      <div className='mp-print-btn-wrap'>
        <ReactToPrint
          trigger={() => <span className='mp-print-btn'>Print this out!</span>}
          content={() => this.componentRef}
          onBeforePrint={() => {
            if (!oInp) oInp = document.querySelector('li.mp-print-label-header-inp-wrap > input');
            if (oInp) oInp.disabled = true;
          }}
          onAfterPrint={() => {
            console.log(oInp);
            if (!oInp) oInp = document.querySelector('li.mp-print-label-header-inp-wrap > input');
            if (oInp) {
              this.props.clearPrintInfo();
              oInp.disabled = false;
              oInp.focus();
            }
            // setTimeout(() => {
            //   if (oInp) oInp.focus();
            // }, 200 )
            // console.log(oInp);
          }}
        />
        <ComponentToPrint {...this.props} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

const mapStateStateToProps = (state: { packageStore: { curPrintDiaInfo: any; curPrintPackage: any; }; loginInfo: { userDetailInfo: any; }; }) => {
  return {
    orderData: state.packageStore.curPrintDiaInfo,
    packageDate: state.packageStore.curPrintPackage,
    userInfo: state.loginInfo.userDetailInfo,
  }
}
const mapDispatchStateToProps = dispatch => {
  return {
    clearPrintInfo: () => {
      dispatch({ type: 'packageStore/clearCurPrintInfo', payload: null });
    }
  }
}

export default connect(mapStateStateToProps, mapDispatchStateToProps)(Example);