import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Alert as AntdAlert } from 'antd';
import { AlertProps } from 'antd/lib/alert';
import { Subject } from 'rxjs';
import './alert.scss';

const param$ = new Subject<Parameter>();
let isExist = false;

const openAlert = (param: Parameter) => {
  param$.next(param);
  const hasDom = document.querySelector('body #jatai-alert');
  if (!hasDom) {
    const div = document.createElement('div');
    div.id = 'jatai-alert';
    document.body.appendChild(div);
    setTimeout(() => {
      ReactDOM.render(<Alert param={param} />, document.getElementById("jatai-alert"));
    });
  }
}

const Alert = (props) => {
  isExist = true;
  const p: Parameter = Object.assign({
    type: 'success',
    showIcon: true,
    closable: true,
    duration: 3000
  }, { ...props.param })

  useEffect(() => {
    const subscription$ = param$.subscribe(param => open(param));
    return () => {
      subscription$.unsubscribe();
    }
  }, []);

  const [visible, setVisible] = useState(true);
  const [param, setParam] = useState(p);

  useState(() => {
    setTimeout(() => {
      setVisible(false);
      isExist = false;
    }, param.duration);
  });


  const open = (param: Parameter) => {
    if (isExist) { return; }
    const p = Object.assign({
      type: 'success',
      showIcon: true,
      closable: true,
      duration: 3000
    }, { ...param });
    setParam(p);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      isExist = false;
    }, p.duration);
  }

  const onDestory = () => setVisible(false);

  return (
    visible ? <AntdAlert
      className="global-alert"
      message={param.message}
      type={param.type}
      showIcon={param.showIcon}
      closable={param.closable}
      afterClose={onDestory} /> : null
  );
};

export { openAlert }

interface Parameter {
  message: string;
  type?: AlertProps['type'];
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
}