import React from 'react';
import styles from './index.less';

function Home() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

Home.title = '首页'
Home.wrappers = ['@/routes/PrivateRouter'];

export default Home;