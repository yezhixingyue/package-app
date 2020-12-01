import React, { useEffect } from 'react'
import PrintHeaderContainer from '../../components/PrintLabelComps/container/PrintHeaderContainer';
import PrintComp from '@/components/print';
import getLodop from '@/assets/js/lodopPrint/lodopFuncs'

export default function PrintLabelPageLayout(props: { children: React.ReactNode; }) {

  let timer: NodeJS.Timeout | undefined;
  useEffect(() => {
    timer = setTimeout(() => {
      getLodop()
    }, 1000);
    return () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    }
  }, [])

  return (
    <section className='page-common-style-wrap'>
      <header>
        <div className='page-header-content'>
          <PrintHeaderContainer />
        </div>
      </header>
      <PrintComp />
      { props.children }
    </section>
  )
}
