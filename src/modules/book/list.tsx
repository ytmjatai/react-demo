import React from 'react';
import { Table, Modal, Button, Tag, Radio, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


import { IBook } from '../../models/book';
import { IAuthor } from '../../models/author';
import { ICategory } from '../../models/category';
import { IPublisher } from '../../models/publisher';

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
      render: (a: IAuthor) => `${a.first_name}${a.last_name}`
    },
    {
      title: '所在分类', dataIndex: 'category',
      render: (c: ICategory) => `${c?.title ? c.title : ''}`
    },
    {
      title: '出版社', dataIndex: 'publisher',
      render: (p: IPublisher) => `${p?.name ? p.name : ''}`
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
          title={ <div className="text-left font-weight-bold">添加 / 编辑书籍</div>}
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
  books?: IBook[];
  loading?: boolean;
  editVisible?: boolean;
  confirmLoading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
  }
}