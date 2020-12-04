import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Radio,
  Select, Cascader, DatePicker,
  InputNumber, TreeSelect, Switch,
  Divider
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import rxSvc from '../../services/rx-event.service';
import * as bookSvc from '../../services/book.service';
import * as cateSvc from '../../services/category.service';
import * as pubSvc from '../../services/publisher.service';
import * as authorSvc from '../../services/author.service';
import { IAuthor } from '../../models/author';
import { IPublisher } from '../../models/publisher';
import { ICategory } from '../../models/category';

const Edit = () => {

  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState('');
  const [publishers, setPublishers] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const initUI = async () => {
    const [book, authors, publishers] = await Promise.all([
      bookSvc.getById(1),
      authorSvc.getList(),
      pubSvc.getList(),
      cateSvc.getList(),
    ]);

    const cs = cateSvc.getTreeData();
    setCategories(cs);

    const auts = [];
    for (const author of authors) {
      auts.push({
        label: author.first_name + author.last_name,
        value: author.id
      })
    }
    setAuthors(auts);

    const pubs = [];
    for (const pub of publishers) {
      pubs.push({
        label: pub.name,
        value: pub.id
      })
    }
    setPublishers(pubs);

    form.setFieldsValue({
      title: book.title,
      ISBN: book.ISBN,
      category: book.category ? book.category.title : '',
      author: book.author ? book.author.id : '',
      publisher: book.publisher ? book.publisher.id : ''
    });
  }


  useEffect(() => {
    initUI();
    const author$ = authorSvc.authors$.subscribe(
      (authors) => onAuthorsChange(authors)
    );

    const cate$ = cateSvc.categories$.subscribe((cates) => onCatesChange(cates));
    return () => {
      author$.unsubscribe();
      cate$.unsubscribe();
    }
  }, []);

  const onCatesChange = (cates) => {

  }

  const onAuthorsChange = async (authors) => {
    const auts = [];
    for (const author of authors) {
      auts.push({
        label: author.first_name + author.last_name,
        value: author.id
      })
    }
    setAuthors(auts);
  }
  const onPublishersChange = async () => {

    const publishers = await pubSvc.getList();
    const pubs = [];
    for (const publisher of publishers) {
      pubs.push({
        label: publisher.name,
        value: publisher.id
      })
    }
    setPublisher('');
    setPublishers(pubs);
  }



  const onFieldChange = (field: string, e: any) => {
    switch (field) {
      case 'publisher':
        setPublisher(e.target.value)
        break;
      case 'first_name':
        setFirstName(e.target.value)
        break;
      case 'last_name':
        setLastName(e.target.value)
        break;
      default:
        break;
    }

  }

  const addField = (field: string) => {
    switch (field) {
      case 'author':
        addAuthor()
        break;
      case 'publisher':
        addPublisher()
        break;
      default:
        break;
    }
  }

  const addAuthor = async () => {
    const model: IAuthor = {
      first_name: firstName,
      last_name: lastName
    }
    await authorSvc.add(model);
    setFirstName('');
    setLastName('');
    await authorSvc.getList();
  }

  const addPublisher = async () => {
    const model: IPublisher = {
      name: publisher
    }
    await pubSvc.add(model);
    setPublisher('');
    onPublishersChange();
  }

  return (
    <>
      <Form layout="vertical" form={form} size="middle">
        <Form.Item label="ISBN" name="ISBN" rules={[{ required: true, message: '请输入ISBN!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="书籍名称" name="title" rules={[{ required: true, message: '请输入书籍名称!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="作者" name="author">
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={authors}
            dropdownRender={menu => (
              <>
                {menu}
                <div className="p-2 d-flex align-items-center">
                  <Input className="flex-grow-1" placeholder="姓氏" onChange={onFieldChange.bind(this, 'first_name')} />
                  <Input className="ml-1 flex-grow-1" placeholder="名字" onChange={onFieldChange.bind(this, 'last_name')} />
                  <Button className="ml-1" type="primary" icon={<PlusOutlined />} onClick={addField.bind(this, 'author')}>添加</Button>
                </div>
              </>
            )}
          >
          </Select>
        </Form.Item>

        <Form.Item label="出版社" name="publisher">
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={publishers}
            dropdownRender={menu => (
              <>
                {menu}
                <div className="p-2 d-flex align-items-center">
                  <Input className="flex-grow-1" placeholder="出版社名称" onChange={onFieldChange.bind(this, 'publisher')} />
                  <Button className="ml-1" type="primary" icon={<PlusOutlined />} onClick={addField.bind(this, 'publisher')}>添加</Button>
                </div>
              </>
            )}
          >
          </Select>

        </Form.Item>

        <Form.Item label="分类" name="category">
          <TreeSelect treeData={categories} />
        </Form.Item>

        <Form.Item label="简介" name="summary">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

      </Form>
    </>
  );
};

export default Edit;