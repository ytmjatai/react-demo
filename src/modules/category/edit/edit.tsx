import React, { useState, useEffect, EffectCallback, forwardRef, useImperativeHandle } from 'react';
import { Form, TreeSelect, Input, Button, InputNumber } from 'antd';
import * as cateSvc from '../../../services/category.service';
import { CategoryModel } from '../../../models/category';


const Edit = forwardRef((props: PropsModel, eref) => {

  const cates = cateSvc.getTreeData();
  const cate = cateSvc.cateSelect$.getValue();
  const action = cateSvc.action$.getValue();
  const [form] = Form.useForm<CategoryModel>();

  switch (action) {
    case 'add':
      form.setFieldsValue({
        parentId: cate.id
      });
      break;
    case 'edit':
      form.setFieldsValue(cate);
      break;
    default:
      break;
  }


  useImperativeHandle(eref, () => ({
    onSubmit: async () => {
      const valid = await form.validateFields();
      if (!valid) {
        return false;
      }
      await doSubmit();
    }
  }))

  const doSubmit = async () => {
    const model: CategoryModel = form.getFieldsValue();
    switch (action) {
      case 'add':
        const addRes = await cateSvc.add(model);
        cateSvc.cateSelect$.next(addRes);
        return;
      case 'edit':
        model.id = cate.id;
        const editRes = await cateSvc.edit(model);
        cateSvc.cateSelect$.next(editRes);
        return;
      default:
        break;
    }
  }

  // useEffect(() => {

  //   const cate$ = cateSvc.cateSelect$.subscribe(cate => onCateChange(cate));
  //   return () => {
  //     cate$.unsubscribe();
  //   }
  // }, []);





  // const onFinish = (form) => {

  // }

  return (
    <Form colon labelAlign="right" labelCol={{ span: 4 }} form={form}>
      <Form.Item label="分类名称" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="分类编码" name="code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="上级分类" name="parentId">
        <TreeSelect treeData={cates} />
      </Form.Item>
      <Form.Item label="排序" name="sequence">
        <InputNumber min={1} />
      </Form.Item>
    </Form>
  )
});

export default Edit;

interface PropsModel {
  onClose?: Function;
}