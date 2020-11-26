import React, { useState, useEffect, EffectCallback } from 'react';
import loadable from '@loadable/component'
import { render } from 'react-dom';
import { Row, Col, Divider } from 'antd';

const List = loadable(() => import('./list/list'));
const Edit = loadable(() => import('./edit/edit'));

import './category.scss';


const Category = () => {

  return (
    <div className="h-100">
      <Row className="h-100">
        <Col flex="500px" className="h-100 overflow-hidden"> <List /> </Col>
        <Col flex="auto" className="ml-3 border-left"> <Edit />  </Col>
      </Row>


    </div>
  );
}

export default Category;


