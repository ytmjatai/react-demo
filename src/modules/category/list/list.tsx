import React, { useState, useEffect, EffectCallback } from 'react';

import * as cateSvc from '../../../services/category.service';
import { CategoryModel } from '../../../models/category';

const List = () => {

  useEffect(() => {
    cateSvc.getList();
    const cate$ = cateSvc.categories$.subscribe(
      (cates) => onCategoriesChange(cates)
    );
    return () => {
      cate$.unsubscribe();
    }
  }, []);

  const [categories, setCategories] = useState([])

  const onCategoriesChange = async (cates) => {
    setCategories(cates);
  }

  return (
    <>
      {
        categories.map((cate: CategoryModel) =>
          <div key={cate.id}>{cate.id} -  {cate.title}</div>
        )
      }
    </>
  )
}

export default List;