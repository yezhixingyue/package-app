import React from "react";
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <section style={{width: '70mm', height: '90mm', paddingTop: '1mm'}}>
        <div style={{width: '65mm', margin: '0 auto', border: '1px solid #000'}}>
          {/* 上面双竖列部分 */}
          <div style={{display: 'flex', textAlign: 'center'}}>
            <ul style={{width: '42mm'}}>
              <li style={{fontSize: '30px', borderRight: '1px solid #000', borderBottom: '1px solid #000', height: '10mm', lineHeight: '9mm'}}>DYY002</li>
              <li style={{fontSize: '14px', borderRight: '1px solid #000', borderBottom: '1px solid #000', height: '8mm', lineHeight: '7mm'}}>郑州市中西网点</li>
              <li style={{fontSize: '14px', borderRight: '1px solid #000', borderBottom: '1px solid #000', height: '7mm', lineHeight: '7mm'}}>豫A0000547</li>
              <li style={{fontSize: '14px', borderRight: '1px solid #000', borderBottom: '1px solid #000', height: '9mm', lineHeight: '8mm'}}>创新广告传媒公司</li>
            </ul>
            <div style={{borderBottom: '1px solid #000'}}>
              <div>
                <img src="1" alt="" style={{width: '22mm', height: '22mm'}} />
                <p style={{fontSize: '12px', height: '6mm', lineHeight: '6mm'}}>10052684456545</p>
              </div>
              <p style={{backgroundColor: '#000', color: '#fff', height: '5mm', lineHeight: '5mm'}}>配送</p>
            </div>
          </div>
          {/* 下面单竖列部分 */}
          <ul>
            <li style={{paddingLeft: '1mm', fontSize: '14px', borderRight: '1px solid #000', borderBottom: '1px solid #000', height: '7mm', lineHeight: '7mm'}}>
              <span>张三三</span><span style={{paddingLeft: '1mm'}}>15985623658</span>
            </li>
            <li style={{height: '16mm', paddingTop: '1mm', paddingLeft: '1mm', lineHeight: '5mm', fontSize: '14px', fontWeight: 'lighter', overflow: 'hidden'}}>
              <span>收件地址：</span><span>河南省郑州市金水区赛打赏的还哦回答说的还哦回答说的还哦回答说大还哦回答说大萨哦回答说大萨达萨达</span>
            </li>
            <li style={{height: '11mm', borderBottom: '1px solid #000', borderTop: '1px solid #000', lineHeight: '5mm', display: 'flex', textAlign: 'center', paddingTop: '0.5mm'}}>
              <div style={{width: '10mm'}}>
                <p style={{ textAlign: 'center'}}>检:</p>
                <p>089</p>
              </div>
              <div style={{backgroundColor: '#000', color: '#fff', width: '8mm', marginTop: '-0.5mm'}}>
                <p>产</p><p>品</p>
              </div>
              <div style={{flex: '0 0 auto', width: '46mm', textAlign: 'left', paddingLeft: '1mm'}}>
                <p style={{lineHeight: '5.5mm', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden'}}>美绘系列 - 美绘莱ascasdsa尼纹消磁</p>
                <p style={{lineHeight: '4.5mm', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden'}}>001-50-90*54，90*54*54</p>
              </div>
            </li>
            <li style={{height: '19mm', paddingTop: '1mm', paddingLeft: '1mm', fontFamily: 'FangSong'}}>
              <div style={{height: '10mm', lineHeight: '5mm', fontSize: '14px', overflow: 'hidden'}}>
                备注：地方撒了解的就爱上了大数据就爱上了觉得大数据零零大家按时大数据量加大了巨大胜利的撒决定了
              </div>
              <div style={{height: '8mm', lineHeight: '4mm', fontSize: '12px', overflow: 'hidden'}}>
                保留此包裹时，数据就爱上了觉得大数据零零大家按时大数据量加大了巨大胜利的撒决定了数据就爱上了觉得大数据零零大家按时大数据量加大了巨大胜利的撒决定了
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
      <div>
        <ReactToPrint
          trigger={() => <a href="#/print">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;