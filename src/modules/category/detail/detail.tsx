import React, { useState, useEffect, EffectCallback } from 'react';
import { Form, Input } from 'antd';

import * as cateSvc from '../../../services/category.service';
import { CategoryModel } from '../../../models/category';

const Detail = () => {
  const [cate, setCate] = useState<CategoryModel>({});
  const [pcate, setPcate] = useState<CategoryModel>({});

  useEffect(() => {
    cateSvc.getList();
    const cate$ = cateSvc.cateSelect$.subscribe(
      (cate) => onCatesChange(cate)
    );
    return () => {
      cate$.unsubscribe();
    }
  }, []);

  const onCatesChange = async (cate: CategoryModel) => {
    if (cate && cate.parentId) {
      const pcate = await cateSvc.getById(cate.parentId);
      setPcate(pcate);
    } else {
      setPcate({})
    }
    setCate(cate);
  }


  return (
    <>

      <Form labelAlign="right" labelCol={{ span: 3 }}>
        <Form.Item label="分类名称" >
          <Input readOnly value={cate?.title ? cate.title.toString() : ''} />
        </Form.Item>
        <Form.Item label="分类ID">
          <Input readOnly value={cate?.id ? cate.id : ''} />
        </Form.Item>
        <Form.Item label="分类编码">
          <Input readOnly value={cate?.code ? cate.code : ''} />
        </Form.Item>
        <Form.Item label="上级分类">
          <Input readOnly value={pcate?.title ? pcate.title.toString() : ''} />
        </Form.Item>
        <Form.Item label="排序">
          <Input readOnly value={cate?.sequence ? cate?.sequence : ''} />
        </Form.Item>
      </Form>
    </>
  )
}

export default Detail;