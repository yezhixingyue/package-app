import React from 'react'
import { history } from 'umi'

export default function PrivateRouter(props: { children: any; }) {
  const isLogin = sessionStorage.getItem('loginAuth');
  if (isLogin) return <>{props.children}</>;
  history.push('/login');
  return null;
}
