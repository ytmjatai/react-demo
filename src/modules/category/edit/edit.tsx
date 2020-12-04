import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { Form, TreeSelect, Input, InputNumber } from 'antd';
import * as cateSvc from '../../../services/category.service';
import { ICategory } from '../../../models/category';
import { ICommomTreeData } from '../../../models/antd-tree';

const Edit = forwardRef((props: PropsModel, eref) => {

  const cate = cateSvc.cateSelect$.getValue();
  const action = cateSvc.action$.getValue();
  const [treeData, setTreeData] = useState<ICommomTreeData[]>([]);
  const [form] = Form.useForm<ICategory>();
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
      if (!valid) { return false; }
      await doSubmit();
    }
  }));

  useEffect(() => {
    const action$ = cateSvc.action$.subscribe(action => onActionChange(action));
    return () => {
      action$.unsubscribe();
    }
  }, []);

  const onActionChange = (action: 'add' | 'edit') => {
    action === 'add' ? setTreeData(cateSvc.getTreeData()) :
      setTreeData(cateSvc.getDisableTreeData());
  }

  const doSubmit = async () => {
    const model: ICategory = form.getFieldsValue();
    switch (action) {
      case 'add':
        return await cateSvc.add(model);
      case 'edit':
        model.id = cate.id;
        if (!model.parentId) {
          model.parentId = null
        }
        const cateSelect = await cateSvc.edit(model);
        cateSvc.cateSelect$.next(cateSelect);
      default:
        break;
    }
  }

  return (
    <Form colon labelAlign="right" labelCol={{ span: 4 }} form={form}>
      <Form.Item label="分类名称" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="分类编码" name="code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="上级分类" name="parentId">
        <TreeSelect treeData={treeData} allowClear />
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