import React from 'react'
import PrintHeaderContainer from '../../components/PrintLabelComps/container/PrintHeaderContainer';

export default function PrintLabelPageLayout(props: { children: React.ReactNode; }) {
  return (
    <section className='page-common-style-wrap'>
      <header>
        <div className='page-header-content'>
          <PrintHeaderContainer />
        </div>
      </header>
      { props.children }
    </section>
  )
}
