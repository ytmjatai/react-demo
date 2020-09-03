import React from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';


class Header extends React.Component {


  toggleAside = () => {
    console.log('aaaaaaa')
  }
  render() {
    return (
      <div className="d-flex align-items-center p-2 border-bottom bg-white">
        <Button icon={<MenuOutlined />} onClick={this.toggleAside} />
        <h1 className="mb-0 ml-3">Jatai</h1>
      </div>
    );
  }

};
export default Header;