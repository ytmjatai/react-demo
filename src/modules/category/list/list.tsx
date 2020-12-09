import React, { useRef, MutableRefObject, useState, useEffect } from 'react';
import { Tree, Divider, Modal, Button, Space } from 'antd';
import {
  SyncOutlined, PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';

import * as cateSvc from '../../../services/category.service';
import { ICategory } from '../../../models/category';
import { DataNode } from 'antd/lib/tree';
import './list.scss'
import Edit from '../edit/edit';

import { openAlert } from '../../../components/alert/alert';
import { ICommomTreeData } from '../../../models/antd-tree';

import { Toast } from '../../../components/toast/toast';

const List = () => {
  const editRef: MutableRefObject<EditModel> = useRef();
  const [expandKeys, setExpandKeys] = useState<number[]>([]);
  const [selectKeys, setSelectKeys] = useState<number[]>([]);
  const [categories, setCategories] = useState<ICommomTreeData[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    cateSvc.getList();
    const cates$ = cateSvc.categories$.subscribe(_ => onCatesChange());
    const cate$ = cateSvc.cateSelect$.subscribe(_ => onCateChange());

    return () => {
      cates$.unsubscribe();
      cate$.unsubscribe();
    }
  }, []);

  const onCatesChange = async () => {
    const tree = cateSvc.getTreeData('id', 'title');
    setCategories(tree);
    const exKeys = cateSvc.categories$.getValue().map(cate => cate.id);
    setExpandKeys(exKeys);
  }

  const onCateChange = async () => {
    const cate = cateSvc.cateSelect$.getValue();
    setSelectKeys([cate.id]);
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

  const onRefresh = () => {
    cateSvc.cateSelect$.next({});
    cateSvc.getList();
  }

  const onAction = (action: 'add' | 'edit') => {
    cateSvc.action$.next(action);
    const cate = cateSvc.cateSelect$.getValue();
    if ((action === 'edit') && (!cate || !cate.id)) {
      Toast.open({
        message: '请选择要编辑的分类',
        type: 'warning'
      })
      return;
    }
    setEditVisible(true);
  }

  const onDelete = async () => {
    const cate = cateSvc.cateSelect$.getValue();
    if (!cate || !cate.id) {
      Toast.open({
        message: '请选择要删除的分类',
        type: 'warning'
      })
      return;
    }

    modal.confirm({
      title: <h3 className="text-danger">警告!!!</h3>,
      content: <span className="text-danger">删除操作无法撤销，如有子分类将一并删除，确定要删除？</span>,
      visible: true,
      onOk: () => doDelete(cate)
    });
  }

  const doDelete = async (cate: ICategory) => {
    await cateSvc.del(cate.id);
    cateSvc.getList();
    cateSvc.cateSelect$.next({});
  }

  const expand = (expandedKeys: any[], { expanded, node }) => {
    const id = node.id;
    const idx = expandedKeys.indexOf(id);
    if (expanded) {
      expandedKeys.push(1);
    } else {
      expandedKeys.splice(idx, 1);
    }
    setExpandKeys([...expandedKeys]);
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
        expandedKeys={expandKeys}
        blockNode={true}
        titleRender={
          (node: TreeDataModel) => <>{node.code + '、' + node.title}</>
        }
        onSelect={onCateSelect}
        selectedKeys={selectKeys}
        onExpand={expand} />
      <Modal
        title={<div className="text-left font-weight-bold">{cateSvc.action$.getValue() === 'add' ? '添加' : '编辑'}书籍</div>}
        visible={editVisible}
        destroyOnClose
        centered
        maskClosable={false}
        onOk={onSubmit}
        onCancel={() => setEditVisible(false)}
      >
        <Edit ref={editRef} />
      </Modal>

      {contextHolder}
    </div>
  )
}

export default List;

interface TreeDataModel extends DataNode, ICategory { }

interface EditModel {
  onSubmit: Function;
}