import React, { useRef, MutableRefObject, useState, useEffect } from 'react';
import { Radio, Tree, Divider, Modal, Button, Space } from 'antd';
import {
  SyncOutlined, PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';

import * as cateSvc from '../../../services/category.service';
import { CategoryModel } from '../../../models/category';
import { DataNode } from 'antd/lib/tree';
import './list.scss'
import Edit from '../edit/edit';

import { openAlert } from '../../../components/alert/alert';

const List = () => {
  const editRef: MutableRefObject<EditModel> = useRef();

  const [categories, setCategories] = useState<DataNode[]>([]);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    cateSvc.getList();
    const cate$ = cateSvc.categories$.subscribe(
      _ => onCategoriesChange()
    );
    return () => {
      cate$.unsubscribe();
    }
  }, []);

  const onCategoriesChange = async () => {
    const tree = cateSvc.getTreeData('id', 'title');
    setCategories(tree);
  }

  const onCateSelect = (keys, e) => {
    const cate = e.selectedNodes[0] ? e.selectedNodes[0] : {};
    cateSvc.cateSelect$.next(cate);
  }

  const onSubmit = async () => {
    await editRef.current.onSubmit();
    setEditVisible(false);
    cateSvc.getList();
  }

  const closeEdit = () => {
    console.log('close edit');
  }

  const onRefresh = () => {
    cateSvc.action$.next('add');
    setEditVisible(true);
  }

  const onAction = (action: 'add' | 'edit') => {
    cateSvc.action$.next(action);
    const cate = cateSvc.cateSelect$.getValue();
    if ((action === 'edit') && (!cate || !cate.id)) {
      openAlert({
        message: '请选择要编辑的分类',
        type: 'warning'
      })
      return;
    }

    setEditVisible(true);
  }

  const onDelete = () => {
    const cate = cateSvc.cateSelect$.getValue();
    if (!cate || !cate.id) {
      openAlert({
        message: '请选择要删除的分类',
        type: 'warning'
      })
      return;
    }
  }



  return (
    <div className="category d-flex flex-column h-100">
      <Space size={5}>
        <Button icon={<SyncOutlined />} onClick={onRefresh}>刷新 </Button>
        <Button icon={<PlusOutlined />} onClick={onAction.bind(this, 'add')}> 添加 </Button>
        <Button icon={<EditOutlined />} onClick={onAction.bind(this, 'edit')}>  编辑  </Button>
        <Button icon={<DeleteOutlined />} onClick={onDelete}>  删除  </Button>
      </Space>
      <Divider className="my-2" />
      <Tree
        className="overflow-auto"
        treeData={categories}
        showLine
        blockNode={true}
        titleRender={
          (node: TreeDataModel) => <>{node.code + '、' + node.title}</>
        }
        onSelect={onCateSelect}
      />
      <Modal
        title={<div className="text-left font-weight-bold">{cateSvc.action$.getValue() === 'add' ? '添加' : '编辑'}书籍</div>}
        visible={editVisible}
        destroyOnClose
        maskClosable={false}
        onOk={onSubmit}
        onCancel={() => setEditVisible(false)}
      >
        <Edit onClose={closeEdit} ref={editRef} />
      </Modal>

    </div>
  )
}

export default List;

interface TreeDataModel extends DataNode, CategoryModel { }

interface EditModel {
  onSubmit: Function;
}