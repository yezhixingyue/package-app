import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';

const iconWarn = (
  <span className='anticon warn'></span>
)

const iconSuccess = (
  <span className='anticon success'></span>
)

export function showConfirm({title = '注意', msg = '', onOk = () => {}, onCancel = () => {}}) {
  Modal.confirm({
    title,
    icon: <>{iconWarn}</>,
    content: msg,
    className: 'mp-show-confirm-message-box',
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      // console.log('OK');
      if (onOk) onOk();
    },
    onCancel() {
      // console.log('Cancel');
      if (onCancel) onCancel();
    },
  });
}

export function showConfirmWithoutMsg({title = '注意', onOk = () => {}, onCancel = () => {}}) {
  Modal.confirm({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box with-null-msg',
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      // console.log('OK');
      if (onOk) onOk();
    },
    onCancel() {
      // console.log('Cancel');
      if (onCancel) onCancel();
    },
  });
}

export function showWarn({title = '错误', msg = '',onOk = () => {}, onCancel = () => {}}) {
  Modal.warn({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box warn-box',
    okText: '关闭',
    content: msg,
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}

export function showSuccess({title = '成功', msg = '', onOk = () => {}, onCancel = () => {}}) {
  Modal.warn({
    title,
    icon: <>{iconSuccess}</>,
    className: 'mp-show-confirm-message-box with-null-msg warn-box',
    okText: '关闭',
    content: msg,
    maskClosable: true,
    centered: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
      else if (onOk) onOk();
    },
  });
}

export function showWarnWithoutMsg({title = '错误', onOk = () => {}, onCancel = () => {}}) {
  Modal.warn({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box with-null-msg warn-box',
    okText: '关闭',
    maskClosable: true,
    onOk() {
      // console.log('OK');
      if (onOk) onOk();
    },
    onCancel() {
      // console.log('Cancel');
      if (onCancel) onCancel();
    },
  });
}



export default {
  showConfirm,
  showSuccess,
  showConfirmWithoutMsg,
  showWarn,
  showWarnWithoutMsg,
}