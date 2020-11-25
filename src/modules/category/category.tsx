import React, { useState, useEffect, EffectCallback } from 'react';
import loadable from '@loadable/component'
import { render } from 'react-dom';

const List = loadable(() => import('./list/list'));
const Edit = loadable(() => import('./edit/edit'));

import './category.scss';


const Category = () => {

  return (
    <div className="d-flex">

      <div className="cate-list">
        <List />
      </div>
      <div className="edit flex-grow-1 bg-secondary">
        <Edit  />

      </div>

    </div>
  );
}

export default Category;


