import React from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import RxEventService from '../../services/rx-event.service';

class Header extends React.Component {

  toggleAside = () => {
    const rxSvc = RxEventService.getInstance();
    rxSvc.publish('toggle-aside', null);
  }
  render() {
    return (
      <div className="d-flex align-items-center p-2 border-bottom bg-white">
        <Button icon={<MenuOutlined />} onClick={this.toggleAside} />
        <h1 className="mb-0 ml-3">React Demo</h1>
      </div>
    );
  }

};
export default Header;