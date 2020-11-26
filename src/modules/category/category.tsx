import React from 'react';
import loadable from '@loadable/component'
import { Row, Col } from 'antd';

const List = loadable(() => import('./list/list'));
const Edit = loadable(() => import('./edit/edit'));
const Detail = loadable(() => import('./detail/detail'));

import './category.scss';


const Category = () => {

  return (
    <div className="h-100">
      <Row className="h-100">
        <Col flex="500px" className="h-100 overflow-hidden"> <List /> </Col>
        <Col flex="auto" style={{ maxWidth: '600px' }} className="detail ml-1 border-left p-4"> <Detail />  </Col>
      </Row>


    </div>
  );
}

export default Category;


