import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Alert } from 'antd';
import { AlertProps } from 'antd/lib/alert';
import './toast.scss';
import { Subject } from 'rxjs';

const open$ = new Subject<Parameter>();
let isOpen = false;
const DURATION = 2000;
const Toast = (props) => {
  isOpen = true;
  const p: Parameter = Object.assign({
    type: 'success',
    showIcon: true,
    closable: true,
    duration: DURATION
  }, { ...props.param })
  const [param, setParam] = useState(p);
  const [visible, setVisible] = useState(true);
  const onDestory = () => setVisible(false);

  useState(() => {
    setTimeout(() => {
      setVisible(false);
      isOpen = false;
    }, p.duration);
  });

  useEffect(() => {
    const subscription$ = open$.subscribe((p) => onOpen(p));
    return () => {
      subscription$.unsubscribe();
    }
  }, []);
  
  const onOpen = (param: Parameter) => {
    if (isOpen) { 
      return; 
    }
    const p = Object.assign({
      type: 'success',
      showIcon: true,
      closable: true,
      duration: DURATION
    }, { ...param });
    setParam(p);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      isOpen = false;
    }, p.duration);
  }

  return (
    visible ? <Alert
      message={param.message}
      type={param.type}
      showIcon={param.showIcon}
      closable={param.closable}
      afterClose={onDestory} /> : null
  );
}

Toast.open = (param: Parameter) => {
  open$.next(param);
  const hasDom = document.querySelector('body #global-toast');
  if (!hasDom) {
    const div = document.createElement('div');
    div.id = 'global-toast';
    document.body.appendChild(div);
    setTimeout(() => {
      ReactDOM.render(<Toast param={param} />, document.getElementById("global-toast"));
    });
  }
}

export { Toast };

interface Parameter {
  message: string;
  type?: AlertProps['type'];
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
}
