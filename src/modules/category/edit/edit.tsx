import React, { useState, useEffect, EffectCallback, forwardRef, useImperativeHandle } from 'react';
import { Form, TreeSelect, Input, Button, InputNumber } from 'antd';
import * as cateSvc from '../../../services/category.service';


const Edit = forwardRef((props: PropsModel, eref) => {
  
  const cates = cateSvc.getTreeData();
  const [form] = Form.useForm();
  const cate = cateSvc.cateSelect$.getValue();
  form.setFieldsValue(cate);


  useImperativeHandle(eref, () => ({
    onSubmit: async () => {
      const model = form.getFieldsValue();
      console.log(model);


      const valid = await form.validateFields();
      // if(valid) {
      //   form.submit();
      //   return 'aebdfe';
      // }

    }
  }))

  useEffect(() => {

    const cate$ = cateSvc.cateSelect$.subscribe(cate => onCateChange(cate));
    return () => {
      cate$.unsubscribe();
    }
  }, []);

  const onCateChange = (cate) => {
    console.log('edit' + cate);

  }


  const onClose = () => {
    props.onClose();
    // console.log(props);
    // props.onClose();
  }

  const onFinish = (form) => {

  }

  return (
    <Form colon labelAlign="right" labelCol={{ span: 4 }} form={form} onFinish={onFinish}>
      <Form.Item label="分类名称" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="分类编码" name="code">
        <Input />
      </Form.Item>
      <Form.Item label="上级分类" name="parentId">
        <TreeSelect treeData={cates} />
      </Form.Item>
      <Form.Item label="排序" name="sequence">
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item colon={false} label=" ">
        <Button onClick={onClose}>点击后调用父组件方法关闭模态框</Button>
      </Form.Item>

    </Form>
  )
});

export default Edit;

interface PropsModel {
  onClose?: Function;
}