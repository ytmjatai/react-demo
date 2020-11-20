import React from 'react';
import { Table, Modal, Button, Tag, Radio, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


import { BookModel } from '../../models/book';
import { AuthorModel } from '../../models/author';
import { CategoryModel } from '../../models/category';
import { PublisherModel } from '../../models/publisher';

import * as bookSvc from '../../services/book.service';

import Edit from './edit';



const onSubmit = () => {
  console.log('submittttttt')
}

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};


class List extends React.Component<any, StateModel> {

  columns = [
    { title: 'ISBN', dataIndex: 'ISBN', },
    { title: '名称', dataIndex: 'title' },
    { title: '摘要', dataIndex: 'summary', },
    {
      title: '作者', dataIndex: 'author',
      render: (a: AuthorModel) => `${a.first_name}${a.last_name}`
    },
    {
      title: '所在分类', dataIndex: 'category',
      render: (c: CategoryModel) => `${c?.title ? c.title : ''}`
    },
    {
      title: '出版社', dataIndex: 'publisher',
      render: (p: PublisherModel) => `${p?.name ? p.name : ''}`
    },
    {
      title: '操作', key: 'id',
      render: (record) => (
        <Space size="small">
          <Button className="p-0" type="text"
            icon={<EditOutlined style={{ color: '#007bff' }} />}
            onClick={this.openEdit.bind(this, record)} />
          <Button className="p-0" type="text" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: []
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const books = await bookSvc.getList();
    this.setState({
      loading: false,
      books: books
    })

  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({ loading: true });
  };

  openEdit = (e) => {

    this.setState({ editVisible: true })
  }

  closeEdit = () => {
    console.log('closeeeeeeeee')
    this.setState({ editVisible: false })
  }

  render() {
    const { editVisible: visible, loading, confirmLoading } = this.state;
    return (
      <>
        <Table
          columns={this.columns}
          size="middle"
          rowKey={record => record.id}
          dataSource={this.state.books}
          // pagination={pagination}
          loading={this.state.loading}
        // onChange={this.filterChange}
        />

        <Modal
          title="Title"
          visible={visible}
          destroyOnClose
          maskClosable={false}
          // onOk={onSubmit}
          confirmLoading={confirmLoading}
          onCancel={this.closeEdit}
        >
          <Edit />
        </Modal>
      </>

    )
  }
}
export default List;

interface StateModel {
  books?: BookModel[];
  loading?: boolean;
  editVisible?: boolean;
  confirmLoading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
  }
}