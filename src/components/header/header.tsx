import React from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Profile from '../profile/profile';

import rxSvc from '../../services/rx-event.service';

class Header extends React.Component {

  toggleAside = () => {
    rxSvc.publish('toggle-aside', null);
  }
  render() {
    return (
      <div className="d-flex align-items-center p-2 border-bottom bg-white">
        <Button icon={<MenuOutlined />} onClick={this.toggleAside} />
        <h1 className="mb-0 ml-3 text-primary">图书管理系统</h1>

        <div className="ml-auto">
          <Profile />
        </div>
      </div>
    );
  }

};
export default Header;