import React from 'react';
import { Spin } from 'antd';

interface IProps {
  children?: React.ReactElement | string;
  isLoading: boolean;
}

const Index: React.FC<IProps> = (props: IProps) => {
  return (
    <div className={props.isLoading ? 'show mask' : 'mask'}>
      <span>
        <Spin />
      </span>
      <span>{props.children || '加载中...'}</span>
    </div>
  );
};

export default Index;
