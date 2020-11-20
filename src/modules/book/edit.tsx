import React, { useState, useEffect, EffectCallback } from 'react';
import {
  Form, Input, Button, Radio,
  Select, Cascader, DatePicker,
  InputNumber, TreeSelect, Switch,
} from 'antd';

import rxSvc from '../../services/rx-event.service';
import * as bookSvc from '../../services/book.service';
import * as cateSvc from '../../services/category.service';

const Edit = () => {

  const initUI = async () => {
    const [book, cates] = await Promise.all([
      bookSvc.getById(1),
      cateSvc.getList()
    ]);
    for (const cate of cates) {
      cate.value = cate.title,
        cate.pId = cate.parentId ? cate.parentId : 0
    }
    setCategories(cates);
    form.setFieldsValue({
      title: book.title,
      ISBN: book.ISBN,
      category: book.category? book.category.title: '',
      // author: book.author,
      // publisher: book.publisher
    });
  }


  useEffect(() => {
    initUI();
    const author$ = rxSvc.on('author-change').subscribe(_ => getAuthor());
    const cate$ = rxSvc.on('category-change').subscribe(_ => getCategory());
    return () => {
      author$.unsubscribe();
      cate$.unsubscribe();
    }
  }, []);

  const getAuthor = () => { }
  const getCategory = () => { }

  const [form] = Form.useForm();
  const [categories, setCategories] = useState([])

  return (

    <>
      <Form
        layout="vertical"
        form={form}

        size='middle'
      >

        <Form.Item label="ISBN" name="ISBN" rules={[{ required: true, message: '请输入ISBN!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="书籍名称" name="title" rules={[{ required: true, message: '请输入书籍名称!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="作者" name="author">
          <Select>
            <Select.Option value="j">Ja</Select.Option>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="出版社" name="publisher">
          <Input />
        </Form.Item>

        <Form.Item label="分类" name="category">
          <Select options={categories} />
        </Form.Item>

        <Form.Item label="简介" name="summary">
          <Input />
        </Form.Item>



        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>

      </Form>
    </>
  );
};

export default Edit;