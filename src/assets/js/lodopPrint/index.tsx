import getLodop from './lodopFuncs';
import jrQrcode from 'jr-qrcode';

let LODOP:any;

let oInp = document.querySelector('li.mp-print-label-header-inp-wrap > input');

function CreateOnePage({ StationSN, StationName, DistrictSN, CustomerSN, ExpressText, CustomerName, Consignee, Mobile, address, userInfo, ProductClass, ProductName, KindCount, ProductAmount, Unit, SizeString, Content, LastPrintTime, PackageID }) {
  LODOP = getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_整页缩放打印输出");
  LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', '33%');
  const _src = jrQrcode.getQrBase64(PackageID);
  console.log(_src);
  const _PrintInner = `<style>
      .printWrap {
          width: 210mm;
          height: 270mm;
          padding: 0;
          margin: 0, ;
          padding-top: 4mm;
          overflow: hidden;
          box-sizing: border-box;
          text-shadow: 0.01em 0.01em 0.1em #999999 !important
      }
      li {
          list-style: none;
      }
      ul {
          padding: 0;
          margin: 0;
      }
      p {
          margin: 0;
      }
      .content {
          width: 195mm;
          margin: 0 auto;
          border: 1.5pt solid #000;
      }

      .header {
          display: flex;
          text-align: center;
          box-sizing: border-box;
      }

      .header ul {
          width: calc(126mm - 1pt);
          box-sizing: border-box;
      }

      .header ul .header-item-1 {
          font-size: 90pt;
          border-right: 1.5pt solid #000;
          border-bottom: 1.5pt solid #000;
          height: 30mm;
          line-height: 29mm;
      }

      .header-item-2 {
          border-right: 1.5pt solid #000;
          font-size: 36pt;
          padding-left: 3mm;
          border-bottom: 1.5pt solid #000;
          height: 24mm;
          line-height: 21mm;
          overflow: hidden;
          text-align: left;
          font-weight: 700;
      }

      .header-item-3 {
          padding-left: 3mm;
          font-size: 30pt;
          border-right: 1.5pt solid #000;
          border-bottom: 1.5pt solid #000;
          height: 21mm;
          line-height: 21mm;
          text-align: left;
      }

      .header-item-4 {
          padding-left: 3mm;
          font-size: 30pt;
          border-right: 1.5pt solid #000;
          border-bottom: 1.5pt solid #000;
          height: 24mm;
          line-height: 22mm;
          text-align: left;
      }

      .header div {
          width: calc(69mm - 1pt);
          border-bottom: 1.5pt solid #000;
      }

      .header div div {
          padding-top: 3pt;
      }

      .header>div>div>p {
          font-size: 22pt;
          height: 15.5mm;
          line-height: 15.5mm;
      }
      .header>div>div>img {
          width: 250px;
          height: 250px;
      }

      .header>div>p {
          background-color: #000;
          font-size: 33pt;
          color: #fff;
          height: 17mm;
          font-weight: 700;
          line-height: 17mm;
      }

      .content-bottom .bt-item-1 {
          padding-left: 3mm;
          font-size: 30pt;
          border-right: 1.5pt solid #000;
          border-bottom: 1.5pt solid #000;
          height: 21mm;
          line-height: 21mm;
      }

      .content-bottom .bt-item-1 .mobile-wrap {
          padding-left: 1mm;
          margin-left: 4px;
      }

      .bt-item-2 {
          height: 48mm;
          padding-top: 1mm;
          padding-left: 1mm;
          line-height: 15mm;
          font-size: 27pt;
          font-weight: lighter;
          overflow: hidden;
      }

      .bt-item-3 {
          height: 33mm;
          border-bottom: 1.5pt solid #000;
          border-top: 1.5pt solid #000;
          line-height: 15mm;
          display: flex;
          text-align: center;
          padding-top: 0.5mm;
      }

      .bt-item-3-div-1 {
          width: 30mm;
          font-size: 30pt;
      }

      .bt-item-3-div-1-p-1 {
          text-align: center;
      }

      .bt-item-3-div-2 {
          background-color: #000;
          color: #fff;
          font-size: 33pt;
          width: 24mm;
          font-weight: 700;
          margin-top: -1mm;
          padding-top: 2mm;
      }

      .bt-item-3-div-3 {
          flex: 0 0 auto;
          width: 138mm;
          text-align: left;
          padding-left: 3mm;
      }

      .bt-item-3-div-3 p {
          white-space: nowrap;
          overflow: hidden;
          line-height: 16.5mm;
          font-size: 27pt;
      }

      .bt-item-3-div-3 p.second {
          line-height: 13.5mm;
          font-size: 21pt;
      }

      .bt-item-4 {
          height: 57mm;
          padding-top: 3mm;
          padding-left: 3mm;
          text-align: left;
      }

      .bt-item-4 div {
          overflow: hidden;
      }

      .bt-item-4-div-1 {
          height: 30mm;
          line-height: 15mm;
          font-size: 27pt;
      }

      .bt-item-4-div-2 {
          height: 24mm;
          line-height: 12mm;
          font-size: 18pt;
      }
      </style>
      <section class="printWrap">
          
          <div class="content">
              <div class="header">
                <ul>
                    <li class="header-item-1">${StationSN}</li>
                    <li class="header-item-2">
                        ${StationName} - ${DistrictSN}
                    </li>
                    <li class="header-item-3">
                        ${CustomerSN}
                    </li>
                    <li class="header-item-4">${CustomerName}</li>
                </ul>
                <div>
                    <div>
                        <img src="${_src}">
                        <p>${PackageID}</p>
                    </div>
                    <p>${ExpressText}</p>
                </div>
              </div>
              <ul class="content-bottom">
                  <li class="bt-item-1">
                      <span>${Consignee}</span>
                      <span class="mobile-wrap"> ${Mobile}</span>
                  </li>
                  <li class="bt-item-2">
                      <span>收件地址：</span><span>${address}</span>
                  </li>
                  <li class="bt-item-3">
                      <div class="bt-item-3-div-1">
                          <p class="bt-item-3-div-1-p-1">检</p>
                          <p>${userInfo.No}</p>
                      </div>
                      <div class="bt-item-3-div-2">
                          <p>产</p>
                          <p>品</p>
                      </div>
                      <div class="bt-item-3-div-3">
                          <p>${ProductClass.Second} - ${ProductName}</p>
                          <p class="second">${KindCount}款 - ${ProductAmount}${Unit} - ${SizeString}</p>
                      </div>
                  </li>
                  <li class="bt-item-4">
                      <div class="bt-item-4-div-1">
                          备注：${Content}
                      </div>
                      <div class="bt-item-4-div-2">
                          保留此包裹时,代表您已签收并确认产品信息。
                          <p>打印时间${LastPrintTime}</p>
                      </div>
                  </li>
              </ul>
          </div>

      </section>`;
  LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", _PrintInner);
  LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, "");
};

export default function lodopPrint(obj) {
  console.log('lodopPrint');
  CreateOnePage(obj);
  // LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 0, 0, "");
  // LODOP.PREVIEW();
  //        LODOP.PREVIEW();
  LODOP.PRINT();
  //        LODOP.PRINT_SETUP();
  if (!oInp) oInp = document.querySelector('li.mp-print-label-header-inp-wrap > input') ;
  if (oInp) {
    oInp.focus();
  }
};


// 获取打印机列表